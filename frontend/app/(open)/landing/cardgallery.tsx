'use client'
import * as React from 'react';
import {Box, Button, Card, CardContent, Checkbox, Container, Divider, Grid, Paper, Stack, Typography} from '@mui/material';
//NEXT
import Image, { StaticImageData } from 'next/image';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store'; //type for state data
import { updateNewSelection, clearNewSelection  } from '../../store/features/newselection/newselectionSlice';
import { updateCardObject, clearCardObject } from '../../store/features/project/projectSlice';


import beige from '@/public/card-stock/examples/Beige-Invitation.png'
import swan from '@/public/card-stock/examples/Swan-Invitation.png'
import mediterranean from '@/public/card-stock/examples/Mediterranean-Invitation.png'
// Build time import: @/ alias replaces frontend/ as per tsconfig.json

//buiding list of loaded images for map below
const imageList = [beige, mediterranean, swan]


export default function CardGallery() {

  //TODO: NOT LOGGED IN: NEW SELECTION, 
  //TODO: LOGGED IN: SET SELECTION, CLEAR PROJECT, set NEW SELECTION AS PROJECT

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

	return (

		<Container maxWidth={false} sx={{ 
			maxWidth:'1250px', px: { xs: 1 }, mb:5 }}>

        <Typography textAlign='left' sx={{ fontSize: '20pt', color: '#000000', fontFamily: 'Spectral', fontWeight: 500, ml:3, mt:5, mb: 5}} >
          Choose your style
        </Typography>

{/* col 1 */}

			<Grid container sx={{ display:'flex', alignItems:"center", justifyContent: "space-evenly"}}>

        {imageList.map( (i, index) => {return(
          <Grid key={index} size={{xs:4, sm:4, md:3}} sx={{ p:1}}>

          <Image alt='' src={i} width={250} ></Image>

          <Box sx={{display:'flex', justifyContent:'center'}}>
            <Checkbox checked={checked} onChange={handleChange} slotProps={{ input: { 'aria-label': 'controlled' }, }} />
          </Box>

      </Grid>
          )} 
        )} 
{/* end map */}

{/* col3 */}
      <Grid size = {12} sx={{display:"flex", alignItems: 'flex-start', justifyContent: 'center', mb: 10}}>

        <Button variant="outlined"  size= 'medium' 
          sx={{ color: 'black',width:'fit-content', height:'fit-content', fontWeight: 400, border:1, boxShadow: '0 0 0 3px lightblue', m:4}}>
          Next
        </Button>

      </Grid>

      </Grid>
      {/* end grid container */}

<Divider />
</Container>
	);
}
