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

export default function AppbarOnboarding( ) {
  const dispatch=useDispatch();

  const appbar_height = 30;

  const router = useRouter()

//_______________________________________________logout endpoint
  const [logout, { isLoading, error }] = useLogoutMutation();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const loggedOutPromise = await logout().unwrap() // Make the logout request
      dispatch(clearCredentials()); // Clear token from Redux store

      // Navigate to onboarding/welcome
      router.push('/');

      return ( persistor.purge()) // Clear tokens from Redux store
      
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
  // <Container maxWidth={false} sx={{m:0, p:0}}>

  <AppBar position="static" elevation={0} sx={{ display:'flex', alignContent:'center', justifyContent:'center', width: '100%', minHeight: '60px',bgcolor: '#011e31', m:0, p:0}}>   
  <Grid container sx={{ width:'100%'}}>
      {/* divide appbar into three horiz sections */}

    {/* section 1 */}
    <Grid size = {2} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Link href="/" style={{paddingLeft:'1px'}}>
        <Image src={logoLight} alt='1DMail Logo' style={{ margin: '3px', maxHeight: '100%', width: 120, objectFit: 'contain',}}/>
        </Link>
    </Grid>

    <Grid size = {8} ></Grid>

    <Grid size = {2} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Button sx={{ alignSelf: 'flex-end' }} onClick={handleLogout}>
          <Typography variant='h4' sx={{ color: 'white', px: 1, fontSize: '12pt', display: 'inline'}}>
            Logout
          </Typography>
      </Button>
    </Grid>

  </Grid>
  </AppBar>

  // </Container>
    )}


//By adding m: 0, p: 0 to the sx prop of the Container, you remove the default padding and allow the 
// AppBar to fill the entire width of the viewport.



  // "0 0 auto" expands to flex-grow: 0, flex-shrink: 0, and flex-basis: auto
//  item won’t grow to fill extra space in a flex container, won’t shrink when 
// space is tight, and its starting size is based on its natural size (auto—typically 
// its width/height if set, otherwise its content). 