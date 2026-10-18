'use client'
import * as React from 'react';
import { useState } from 'react';
import {AppBar, Box, Button, Checkbox, Container, Grid, FormControl, Paper, Stack, TextField, Typography} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//next
import Image from 'next/image';
import Link from 'next/link'

//Redux
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { updateCo } from '../../store/features/co_Delete/coSlice';
import { updateRep } from '../../store/features/rep_Delete/repSlice';

//react hook form
import { useForm, Controller } from "react-hook-form";
import CampaignSummary from './campaign_summary';
import ContactForm from './contact_form';

interface ContactSummaryProps {
  onEdit:()=> void;
  }

  // standard React "lifting state up" — the child (ContactSummary) doesn't manage visibility itself; it just notifies the parent, and the parent re-renders with the new state.
export default function ContactSummary({onEdit}: ContactSummaryProps ) {

  //obtain from store: company, poc, email, tel
	const rep = useSelector ( (state: RootState)=>state.rep) 
  const co = useSelector ( (state: RootState)=>state.co) 
  console.log('rep', rep.formData, 'co', co.coData)

const handleClick = () => {
  onEdit();  //from page.tsx: onEdit={()=>setShowForm(true), makes the entry form appear
  console.log('clicked')
  }

  return (
    
  <Container maxWidth={false} sx={{ maxWidth:'1200px', bgcolor: 'transparent', pb:3}}>

{/* ROW 1 ______________________________________________________________________________________________*/}

  <Grid container sx={{display:"flex", alignItems: 'center', justifyContent: 'flexStart', overflow: 'hidden', // ensure no overflow when using objectFit: 'cover
            mb:1, backgroundColor: '#ffffff', borderRadius: '8px', px:3, py:1 }}> 

			<Grid size = {{xs:12}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'flexStart', objectFit: 'contain', mb: 1}}> 

				<Typography variant='h6' textAlign='left'>
					Profile <br/>
				</Typography>
      </Grid>

      <Grid size = {{xs:12}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'flexStart', objectFit: 'contain', mb: 1}}> 

        <Stack direction="row" sx={{mb:2}}>
            <Typography sx={{width:'130px'}}>Organization: </Typography>    
            <Typography >{co.coData.name} </Typography>
        </Stack>
      </Grid>

      <Grid size = {{xs:12}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'flexStart', objectFit: 'contain', mb: 1}}> 

        <Stack direction="row" sx={{mb:2}}>
            <Typography sx={{width:'130px'}}>Point of Contact: </Typography>    
            <Typography >{rep.formData.name} </Typography>
        </Stack>
      </Grid>

      <Grid size = {{xs:12}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'flexStart', objectFit: 'contain', mb: 1}}> 

        <Stack direction="row" sx={{mb:2}}>
            <Typography sx={{width:'130px'}}>Email: </Typography>    
            <Typography>{co.coData.email} </Typography>

            <Typography sx={{width:'60px', ml: 5}}>Tel: </Typography>    
            <Typography>{co.coData.phoneNumber} </Typography>
        </Stack>
      </Grid>

        <Button variant="outlined" color="secondary" onClick={handleClick}>Edit</Button>
  
{/* end grid container for column 1 */}
  </Grid>

</Container>
    
  )
}
