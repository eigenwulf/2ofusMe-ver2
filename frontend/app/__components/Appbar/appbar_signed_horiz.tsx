// to be used in conjunction with vertical 
// appbar
'use client'
import { AppBar, Avatar, Box, Button, Container, Grid, Menu, MenuItem, Stack, Toolbar, IconButton, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
// ________________________________________________________Redux
import { useSelector, useDispatch } from 'react-redux'
import { persistor } from '../../store/store'
import type { RootState } from '../../store/store';
import { useLogoutMutation } from '../../store/features/api/apiSlice'  //makes internal api endpoints call
import { clearCredentials } from '../../store/features/auth/authSlice'; 

import logoLight from './assets/logoLight.png';

export default function AppBarSignedHoriz( ) {
  const dispatch=useDispatch();

  const appbar_height = 30;

  const router = useRouter()


  return (
  <AppBar  position="relative" elevation={0} sx={{ display:"flex",alignItems:'center',justifyContent:'center'}} > 
    <Grid container sx={{position:'relative', zIndex:1, width:'100%' }}>

    <Grid size = {5} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Stack direction='column'>
      <Typography sx={{ fontFamily: 'var(--font-montserrat)', color: 'white', px: 1, fontSize: '16pt', display: 'inline'}}>
        Welcome Back [insert name here]
      </Typography>

      <Typography sx={{ fontFamily: 'var(--font-montserrat)', color: 'white', px: 1, fontSize: '12pt', display: 'inline'}}>
        Intermediate Campaign Plan
      </Typography>
      </Stack>
    </Grid>

    <Grid size = {4}> </Grid>

    <Grid size = {3} sx={{display:'flex', justifyContent:'center'}}>
      <Box sx={{ flexGrow: 0, pr:4 }}>
        {/* flexGrow: 0 prevents the Box from expanding to fill any available space in its flex container. */}
        <IconButton sx={{ p: 1 }}>
          <Avatar  />
        </IconButton>
      </Box>
    </Grid>

{/* end grid container */}
    </Grid>
  </AppBar>
    )}


//By adding m: 0, p: 0 to the sx prop of the Container, you remove the default padding and allow the 
// AppBar to fill the entire width of the viewport.



  // "0 0 auto" expands to flex-grow: 0, flex-shrink: 0, and flex-basis: auto
//  item won’t grow to fill extra space in a flex container, won’t shrink when 
// space is tight, and its starting size is based on its natural size (auto—typically 
// its width/height if set, otherwise its content). 