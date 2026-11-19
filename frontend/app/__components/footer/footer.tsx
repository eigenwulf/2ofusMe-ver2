'use client'
import React, { useState, useEffect } from 'react'; 
import { AppBar, Avatar, Box, Button, Container, Grid, Menu, MenuItem, Stack, Toolbar, IconButton, Tooltip, Typography } from '@mui/material'
import { SxProps, Theme } from '@mui/material';
//Next
import Image from 'next/image'
import Link from 'next/link'

import logo from './assets/logo_small_blue.svg';

// ________________________________________________________Redux
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store/store';
import { useLogoutMutation } from '../../store/features/api/apiSlice'  //makes internal api endpoints call
import { clearCredentials } from '../../store/features/auth/authSlice'; 
import { persistor } from '../../store/store';

export default function AppbarLanding({ sx }: { sx?: SxProps<Theme> }) {

  const dispatch = useDispatch()
  const auth_user = useSelector( (state: RootState)=>state.auth.user ) //useSelector obtains object from store, loggedin user object comes from authSlice
  //_______________________________________________logout endpoint
  const [logout, { isLoading, error }] = useLogoutMutation();

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    try {
      const loggedOutPromise = await logout().unwrap() // Make the logout request
      console.log(loggedOutPromise)
      dispatch(clearCredentials()) //Clear auth token, which is not persisted as the other stores
      return ( persistor.purge()) // Clear tokens from Redux store
      
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (

<AppBar  position="relative" elevation={0} sx={{ display:"flex",alignItems:'flex-end',justifyContent:'center', position:'relative', backgroundColor: '#FAF9F6' }} > 
      {/* The <AppBar> needs position: 'relative' so the fill-mode <Image> (which is position: absolute) is contained within it. Add position: 'relative' to the sx prop and add zIndex to the content so it renders above the image: */}

    {/* The AppBar component gets its background from the MUI theme's primary.main color by default.  */}

  <Grid container sx={{ position:'relative', zIndex:1, width:'100%' }}>

  {/* col 1 */}
  <Grid size = {3}>
    <Box sx={{ display: "flex", justifyContent: "center", alignContent:'center'}}>
        <Link
        href="/" style={{paddingLeft:'1px', paddingRight:'1px', paddingTop:'5px',paddingBottom:'5px'}}>
        <Image
          src={logo}
          alt='2ofusme Logo'
          style={{width:'100px', objectFit: 'contain',}}
        />
        </Link>
        {/* <Typography sx={{ display: { xs: 'none', sm: 'block' },fontFamily: 'var(--font-montserrat)', fontSize: {sm:'8pt', md:'9.5pt'}, color: 'rgb(0, 0, 0)',fontWeight: '500',letterSpacing:1,textAlign: 'center', pt:0}} >
        Sponsored Wedding Cards
        </Typography> */}
    </Box>

  </Grid>


  {/* col 2, middle Normal menu from sm to xl*/}

  <Grid size = {6} sx={{display: { xs: 'flex', md: 'flex'}, justifyContent:'flex-start'}}>
    <Stack direction="column" spacing={2} sx={{}}>
      {/* Left */}
      <Box sx={{ flex: "0 0 auto", alignSelf: 'flex-end', paddingBottom:1 }}>
        <Link href="/addressbook" style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontFamily: 'var(--font-montserrat)', color: '', px: 1, fontSize: '12pt',display: 'inline'}}>
            Address Book
          </Typography>
        </Link>
      </Box>

      <Box sx={{ flex: "0 0 auto", alignSelf: 'flex-end', paddingBottom:1 }}>
        <Link href="/about" style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontFamily: 'var(--font-montserrat)', color: '', px: 1, fontSize: '12pt',display: 'inline'}}>
            About
          </Typography>
        </Link>
      </Box>
  </Stack>
</Grid>
  {/* End middle Col */}

{/* right col */}
  <Grid size={3} sx={{display: "flex", justifyContent: "center", alignContent:'center', mt:1}}>
    <Box onClick={auth_user ? handleLogout : undefined} sx={{ alignSelf: 'center', pb:1 }}>
      {!auth_user ? 
      <><Button variant='contained' color="inherit" size='small' href="/signup"><Typography sx={{color:'#0c2980', fontWeight:600}}>Signup</Typography></Button>
      <Button color="inherit" size='small' href="/login" ><Typography sx={{color:'primary.dark', fontWeight:600}}>Login</Typography></Button>
      </>
      :
      <Button variant='outlined' color="inherit" size='small'><Typography sx={{color:'#87a3f8', fontWeight:600}}>Logout</Typography></Button>
      }
    </Box>
    {/* end right Col */}
  </Grid>

  {/*end Grid Container*/}
</Grid>
  </AppBar>

  )
}

// "0 0 auto" expands to flex-grow: 0, flex-shrink: 0, and flex-basis: auto
//  item won’t grow to fill extra space in a flex container, won’t shrink when space is tight, and its starting size is based on its natural size (auto—typically its width/height if set, otherwise its content). 