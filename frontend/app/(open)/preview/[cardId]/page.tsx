//http://127.0.0.1:3000/preview/1
'use client'
import React from "react";
import { Breadcrumbs, Container, Box, Link, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux'
import CardPreview from "../cardpreview";

export default function PersonalizeCard() {
  const auth_user = useSelector((state: any) => state.auth.user)

  return (
    <div className="App">
      <Container disableGutters maxWidth="xl" >

        <Breadcrumbs aria-label="breadcrumb" sx={{mt:2, mb:3}}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography sx={{ fontWeight:'675' }}>Personalize your card</Typography>
        </Breadcrumbs>


<Grid size={12} sx={{border:1, borderColor:'lightgray', mb:2}}></Grid>
{/* divider line at top of page */}

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CardPreview /> 
        </Box>
      </Container>
    </div>
  );
}