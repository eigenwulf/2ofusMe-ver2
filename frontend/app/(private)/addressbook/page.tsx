'use client'
import React from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// MUI
import { Box, Breadcrumbs, Container, TextField, Typography, } from '@mui/material';

//next
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { StaticImageData } from 'next/image'
import Link from 'next/link'

import CurrentProject from './currentproject';
import RecipientAddress from './recipientaddress';
import RecipientTable from './recipienttable';

export default function Recipients () {

  // const navigate=useNavigate();

  return (
    <div className="App">
      <Container maxWidth="lg">
        
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between'}}>
          <Breadcrumbs aria-label="breadcrumb" >
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>

            <Link
              underline="hover"
              color="inherit"
              href="/personalize/">
              Personalized Card
            </Link>

            <Link
              underline="hover"
              color="inherit"
              href="/sender" >
              Sender Address
            </Link>

            <Typography sx={{ color: 'text.primary' }}>Address Book</Typography>
          </Breadcrumbs>
        </Box>
        <CurrentProject />
        <RecipientAddress />
        <RecipientTable />
      </Container>
    </div>
  )
}