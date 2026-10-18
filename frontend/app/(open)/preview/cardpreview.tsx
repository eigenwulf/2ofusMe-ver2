'use client'
import React from 'react';
import { useState, useEffect } from "react";
// MUI
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, TextField, Typography, Paper, } from '@mui/material';
//nextjs
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
//Redux
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store/store'; //type for state data
import { updateNewSelection, clearNewSelection  } from '../../store/features/newselection/newselectionSlice';
import { updateCardObject } from '../../store/features/project/projectSlice';

import CardGallery from '../landing/cardgallery'

import brand1 from './assets/brand1.png'
import brand2 from './assets/brand2.png'
import brand3 from './assets/brand3.png'
import placeholder from './assets/placeholder.png'
// import LoginDialog from '../../../components/authentication/LoginDialog.js'

// tsconfig.json already has a @/* path alias mapping to the project root (./ = frontend).
//Route group folder names like public and private (outside of app) are invisible to Next.js routing but are real directories for the purpose of import statements.
import cardData from '@/public/card-stock/data/cardData.json'

export default function CardPreview ()  {

  const dispatch = useDispatch()

  const auth_user = useSelector( (state: RootState)=>state.auth.user ) //useSelector obtains object from store, loggedin user object comes from authSlice
  if (auth_user != null) {const auth_userpk = auth_user.pk}

  const router = useRouter()
  //obtain id of the chosen card style from the url param personalize/cardId
  const params = useParams<{ cardId: string; }>(); console.log('params',params.cardId)
  // pattern /personalize/:cardId is matched by /personalize/123 then params.cardId will be "123".

  //1. find card with matching params id, access the image property
  const selected_card = cardData.cards.find( i => i.id === Number(params.cardId) )

  //2. dispatch to store only when card is found - avoids clearing the store when manually entering urls
  useEffect(() => {
    if (selected_card) {dispatch( updateNewSelection(selected_card) );
                        dispatch( updateCardObject(selected_card) )
      }

  }, [params.cardId, selected_card]);

  //3. access image and text properties of selected card, fallback to default image if selected_card and/or image not exists (using optional chaining)
  const card_image = selected_card?.image ?? placeholder;
  const card_model = selected_card?.title ?? null;

//login popup 1. onClick calls handleOpenDialog 2. useState set to true 3. <LoginDialog> appears_______________

const [openDialog, setOpenDialog] = useState(false);

// open the dialog: TODO: If logged in, go directly to cardinput, otherwise open dialog for login/signup 
  const handleOpenDialog = () => {
    setOpenDialog(true);
    };

// close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    };

return (

  <Grid container sx={{ display:'flex', alignItems: 'flex-start', justifyContent: 'center', border:1}} >

    {/* COLUMN 1_______________________________________________ */}
    <Grid size={{xs:12, md:7}} sx={{ display: "flex", alignItems: 'center', alignContent:'center', pr:3, borderRight:1 }} >

    <Box sx={{ position:'relative', width:'100%', height:{xs:500, sm:600} }}>
      {selected_card ?       
        <Image alt='' src={card_image!} fill style={{ objectFit:'contain', }} />
        : 
        <CardGallery/>
      }
        {/* The ! is TypeScript's non-null assertion operator. It tells the TypeScript compiler "I guarantee this value is not null or undefined at runtime — stop warning me." */}
        {/* To use fill in Image, Box must have position: relative */}

    </Box>
    </Grid>

  {/* COLUMN 2_______________________________________________ */}
  <Grid size={{xs:12,md:5}} sx={{display:'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection:'column', pl:3}}>

{/* ROW 1 */}
  <Box sx={{borderBottom:1, borderColor:'lightgray'}}>
    <Typography sx={{fontSize:'16pt', textAlign:'left', mt:1, mb:2}}>{card_model}</Typography>
  </Box>

{/* ROW 2 */}
  <Typography sx={{fontSize:'16pt', textAlign:'left', mt:2, mb:2}}>
    We'll print and send this card through postal mail FREE, for up to 100 of your best friends, family, colleagues.  
  </Typography>

  <Typography sx={{fontSize:'16pt', textAlign:'left', mt:2, mb:2}}>
    Made possible by the generous support of brands as these
  </Typography>

{/* ROW 3 */}

<Grid container >
  <Grid size={4}>
    <Image alt="" src={brand1}/>
  </Grid>

  <Grid size={4}>
    <Image alt="" src={brand2}/>
  </Grid>

    <Grid size={4}>
    <Image alt="" src={brand3}/>
  </Grid>
</Grid>

{/* row 3 */}

{/* TODO WHEN CLICK, CHECK FOR AUTH USER, IF NOT AUTH, REDIRECT TO SIGNUP/LOGIN (THEN GO TO CARDINPUT), IF AUTH, NAVIGATE TO CARDINPUT */}

  <Box sx={{width:'100%', display:'flex', justifyContent:'center', mt:5, mb:5}}>
      <Button type="submit" variant="contained" onClick={handleOpenDialog}>
                Customize your card
      </Button>
  </Box>

{/* row 3 */}
<Box sx={{ width:'100%'}}>
<Typography sx={{ fontSize:'14pt', textAlign:'center' }}>Special deals will be matched and inserted with your cards</Typography>
</Box>

</Grid>

          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>

      {/* Login popup appears when handleOpendialog:  open={openDialog} onClose={handleCloseDialog} onLogin={handleLogin} */}
      {/* <LoginDialog open={openDialog} onClose={handleCloseDialog} /> */}

  </Grid>

  );
};