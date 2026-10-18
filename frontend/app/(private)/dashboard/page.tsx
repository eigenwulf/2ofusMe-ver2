// TODO: add conditional section after uploading ad for review.
'use client'
import * as React from 'react';
import {useState} from 'react';
import { use } from 'react';
import {AppBar, Avatar, Box, Button, Checkbox, Container, Grid, IconButton, FormControl, Paper, Stack, TextField, Typography} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//next
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link'

//Redux
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';

import dashCircle from './assets/dashCircle.png'
import AppBarSignedHoriz from "../../__components/Appbar/appbar_signed_horiz";
import DashInfoBoxes from './dashInfoBoxes';
import AdsBarChart from './adsBarChart';
import ContactSummary from './contact_summary';
import CampaignSummary from './campaign_summary';
import ContactForm from './contact_form';


export default function Dashboard( ) {
  const router=useRouter()

  //obtain from store: company, poc, email, tel
	const rep = useSelector ( (state: RootState)=>state.rep) 
  const co = useSelector ( (state: RootState)=>state.co) 
  console.log('rep', rep.formData, 'co', co.coData)

  // showForm (meant to show editable form) is initially false on the presumption that rep data already exists
  const [showForm, setShowForm] = React.useState(false)

  // if the representative store is zero length, re-direct to welcome
  React.useEffect(() => {
    if (!Object.keys(rep.formData).length) {
      router.push('/onboarding/welcome')
    }
  }, [rep.formData, router])

  return (
    
<>
 {/* The <AppBar> needs position: 'relative' so the fill-mode <Image> (which is position: absolute) is contained within it. Add position: 'relative' to the sx prop and add zIndex to the content so it renders above the image: */}

  <AppBarSignedHoriz />

  <Container maxWidth={false} sx={{ maxWidth:'1200px', bgcolor: 'transparent', pb:3}}>

    <Typography variant='h4' sx={{ textAlign: 'left', fontWeight: 500, mt: 3}}>
      Campaign Hub 
    </Typography>

{/* ROW 1 ______________________________________________________________________________________________*/}
<Grid container sx={{display:"flex", alignItems: 'center', justifyContent: 'center', borderRadius: '8px', pl:0, pt:4, pb:4}}>            

{/* COLUMN 1 ___________________________________*/}

      <Grid size = {{xs:12, md: 6}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center', objectFit: 'contain',}}> 
        <Stack direction='column'>

          <Box sx={{ height: '100%', width:'100%', objectFit: 'contain',py:1}}>

          <Typography sx={{fontSize:'16pt', fontWeight:600, pb:2}}>
          Social medium, not social media
          </Typography>

          <Typography sx={{fontSize:'14pt'}}>
          The difference is real: family, friendship, experiences.  
          Manage and track the progress of the 1DMail direct mail journey.<br/ >
        </Typography>
        </Box>

      </Stack>
      </Grid>

{/* COLUMN 2 ___________________________________*/}
      <Grid size = {{xs:12, md: 6}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center', objectFit: 'contain', pr:1}}> 
            <Image
              src={dashCircle}
              alt="dashboard graphic"
              style={{  width: '60%', height: 'auto',objectFit: 'contain' }}
            />
      </Grid>

{/* End Row 1 grid container*/}
</Grid>

    <Box sx={{border: 8, borderColor: '#e3e7e7',}}>
        <DashInfoBoxes />
        <Box sx={{backgroundColor:'white', mb:8}}>
        <AdsBarChart />
        </Box>
    </Box>
{/* if the rep store is not zero length: and showForm is True, insert ContactForm, otherwise show ContactSummary only*/}
    {Object.keys(rep.formData).length
    ?
      showForm 
      ? <ContactForm />
      :null
      // : <ContactSummary onEdit={()=>setShowForm(true)}/> // when onEdit button is clicked showForm is set to true and ContactForm appears
    :
      null
    }
<Box sx={{border: 8, borderColor: '#e3e7e7', mt:5}}>
    <CampaignSummary />
  </Box>

</Container>
</>
  )
}

