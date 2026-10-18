'use client'
import { AppBar, Avatar, Box, Button, Container, Grid, Menu, MenuItem, Stack, IconButton, Tooltip, Toolbar, Typography } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { SxProps, Theme } from '@mui/material';
//Next
import Image from 'next/image'
import Link from 'next/link'

import logo from './assets/logoBlueGrad.png';

// ________________________________________________________Redux
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../../store/store';
import { useLogoutMutation } from '../../../store/features/api/apiSlice'  //makes internal api endpoints call
import { clearCredentials } from '../../../store/features/auth/authSlice'; 
import { persistor } from '../../../store/store';


export default function AppbarLanding({ sx }: { sx?: SxProps<Theme> }) {

{/* collapsed appbar: hamburger icon ___________________________________________________*/}
{/* https://mui.com/material-ui/integrations/routing/#link */}
        <Toolbar disableGutters variant="dense" >

          <Link
            component={RouterLink} //You can achieve integration with third-party routing libraries with the component prop
            variant="h6"
            noWrap
            to="/"
            sx={{
              mr: 2,
              ml: 1,
            }}
          >

            <Box  
              sx={{
										maxheight: '100%',
										width:120,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'right',
										objectFit: 'contain',
										overflow: 'hidden', // ensure no overflow when using objectFit: 'cover
										paddingRight:1,
									}}> 
            
            
              <img
                src={logo}
                alt=""
                className="img"
                sx={{ objectFit: 'contain', p: 1}}
                />
              </Box>
          </Link>

          {/* disappears when size is greater than md */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.key} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>








}