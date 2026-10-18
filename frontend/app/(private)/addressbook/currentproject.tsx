//Purpose: to display the current card at top of the address dashboard
//TODO: IF NO PROJECT CARD, DISPLAY MESSAGE TO CHOOSE A CARD TO SEND
'use client'
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Stack, TextField, Typography, Paper, } from '@mui/material';

//nextjs
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { StaticImageData } from 'next/image'
import Link from 'next/link'

//Redux
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { useListgreetingcardsQuery, useLazyRetrievegreetingcardQuery, useLazyRetrievecardsrecipsbulkQuery } from '../../store/features/api/apiSlice';

  //Store hooks
// import { updateProjectCard } from '../../../store/features/project/projectSlice';

export default function CurrentProject() {
  const auth_user = useSelector( (state:RootState)=>state.auth.user )
  if (auth_user != null) {const auth_userpk = auth_user.pk}
  const current_proj = useSelector ( (state:RootState)=>state.project.cardObject  )

  const project = useSelector((state: RootState) => state.project);
  // const hasProject = Object.keys(project.cardObject).length > 0; 
  // const card_object = (hasProject ? (project.cardObject):'' ); 
  // const card_image_url = card_object.image
  // const card_title = card_object.title

  const returnaddress = useSelector((state: RootState) => state.sender);

return (
<Container>
    <Grid container sx={{ marginTop: 3}}>

      {/* col 1 ________________________________________________________________________*/}
      <Grid size={{xs:6}} sx={{display:'flex', justifyContent: 'center', alignItems: 'center', border: 0}} >  
        <Link underline="hover" color="inherit" href="/personalize/cardinput">

          <Card sx={{ maxWidth: 345,  }}>
              <CardMedia sx={{ width:160,  aspectRatio: '3/3' }} image='/card-stock/examples/Beige-Invitation.png' title="sponsor 1" />
              <CardContent>
                <Typography sx={{fontSize:'16px'}}> 
                  Your Card Style 
                </Typography>
              </CardContent>
              <CardActions></CardActions>
          </Card>
        </Link>
      </Grid>

      {/* col 2 ________________________________________________________________________*/}
      <Grid size={{xs:6}} sx={{display:'flex', justifyContent: 'center', alignItems: 'center', border: 0}} >

{/* insert popup dialog */}
        <Link underline="hover" color="inherit" href="/personalize/cardinput">

          <Card sx={{ maxWidth: 345,  }}>
            <CardContent >
              <Box sx={{border:1}}>
                <Typography>
                {returnaddress.name}
                </Typography>
              </Box>
              <Typography sx={{fontSize:'16px'}}> 
                Your Return Address
              </Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </Link>

      </Grid>

  </Grid>
</Container>
)}

/*unwrap() returns the actual payload (data) when the request succeeds, or 
throws the error when it fails — so you can use normal try/catch and get the data directly.
If you need the response immediately in the click handler (to dispatch, navigate, etc.), 
await trigger(...).unwrap() gives you the data value right away.
If you omit .unwrap(), await trigger(...) yields an action/result object and you must read result.data or check result.error
*/