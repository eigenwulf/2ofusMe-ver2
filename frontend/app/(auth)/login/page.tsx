//TO DO: UPON LOGIN, LOAD PROJECT IN STORE: LIST OF RECIPIENTS AND CURRENT GREETINGCARD (IF SELECTED)

"use client"
import React, { useState } from 'react';
import {AppBar, Box, Button, Card, CardMedia, CardContent, CardActions, Container, Divider, Grid, Paper, Stack, TextField, Typography} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link'

import EmailLogin from './EmailLogin'
// import admaillogo from '../assets/1dmailLogo.png';

import admaillogo from '../../__components/Appbar/assets/logoBrown.png'
import gLogo from '../assets/g-logoTrans.png';
import msIcon from '../assets/microsoft.png';
import appleIcon from '../assets/apple.png';

export default function Register() {


  return (
  <Container maxWidth={false} sx={{ maxWidth:'1200px'}}>

{/* Appbar specific to page */}
  <AppBar color="transparent" position="static" elevation={0} sx={{m:1}}>   
    <Box sx={{ flex: "1 1 auto", display: "flex", justifyContent: "center", paddingBottom:0 }}>
      <Stack direction="column" alignItems="center">
        <Link href="/" style={{paddingLeft:'1px', paddingRight:'8px'}}>
        <Image src={admaillogo} alt='1DMail Logo'style={{maxHeight:'100%', width:300, objectFit: 'contain',}}/>
        </Link>
    </Stack>
    </Box>
  </AppBar>

  <Box sx={{ height:'600px', display: "flex", justifyContent: "center",alignItems: "center"}}>
  <Stack spacing={3} sx={{ alignItems: "center"}}>

			<Typography variant='h6' sx={{fontWeight: '600', letterSpacing:1,textAlign: 'center',pt:1, mb:0 }} >
			Welcome back to admail for family and friends. 
			</Typography>

{/* google */}
<Box sx={{margin:3}}>
    <Button variant="outlined" size= 'medium' sx={{ justifyContent: "space-around",  width:'350px', height:'fit-content', 
      color:'black', borderColor:'primary.dark', fontWeight: 500}}>
        <Image src={gLogo} alt='GLogo' width={18} style={{ objectFit: 'cover'}} />
        <span>Continue with Google</span> <span></span> 
    </Button>
    </Box>
{/* Microsoft */}
    <Button variant="outlined" size= 'medium' sx={{ justifyContent: "space-around",  width:'350px', height:'fit-content', 
      color:'black', borderColor:'primary.dark', fontWeight: 500}}>
        <Image src={msIcon} alt='GLogo' width={18} style={{ objectFit: 'cover'}} />
        <span>Continue with Microsoft</span> <span></span> 
    </Button>

{/* Apple */}
    <Button variant="outlined" size= 'medium' sx={{ justifyContent: "space-around",  width:'350px', height:'fit-content', 
      color:'black', borderColor:'primary.dark', fontWeight: 500}}>
        <Image src={appleIcon} alt='GLogo' width={18} style={{ objectFit: 'cover'}} />
        <span>Continue with Apple</span> <span></span> 
    </Button>


  <Divider
    flexItem
    sx={{
      alignSelf: "stretch",          // makes it span the Stack’s width
      width: "100%",
      my: 2,
      "&::before, &::after": {
        borderColor: "primary",        // the actual line color
        borderTopWidth: 1,
      },
      "& .MuiDivider-wrapper": {
        px: 1,
        lineHeight: 1,
        display: "flex",
        alignItems: "center",        // keeps label vertically centered
      },
    }}
  >
  Or
  </Divider>

    <EmailLogin />

  </Stack>
  </Box>

  </Container>
  )
}

