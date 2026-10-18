'use client'
import React, { useState, useContext, useEffect } from 'react';
import {AppBar, Box, Button, Card, CardMedia, CardContent, CardActions, Checkbox, Container, Divider, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, FormControl, Paper, Stack, Step, StepLabel, Stepper, TextField, Typography} from '@mui/material';
import { useRouter } from 'next/navigation';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';

//Next
import Link from 'next/link'

import { useForm, Controller } from "react-hook-form";

  type formInput = {
    customuser: number;
  };

export default function DashInfoBoxes( ) {
  
  // redux
  const company = useSelector( (state: RootState)=>state.co.coData ) 
  const levelDetail = company.current_campaign_level?.[0]?.level

return(
<>
  <Grid container sx={{
      display:"flex", alignItems: 'flex-start', justifyContent: 'center',
      overflow: 'hidden', // ensure no overflow when using objectFit: 'cover
      mt:3, borderRadius: '8px', mb:3
    }}> 

{/* COLUMN 1 ___________________________________*/}

      <Grid size = {{xs:6}} sx={{ display:"flex", alignItems: 'flex-start', justifyContent: 'center',pl:1, mb: 1}}> 

      <Card sx={{backgroundColor: '#ffffff', width:'280px'}}>
        <CardContent>
          <Grid size={{xs:8}}>
            <Typography variant='body1' sx={{fontWeight:400}}>
              confirmed ads mailed
            </Typography>
            <Typography variant='h4' sx={{fontWeight:575}}>
              120 
            </Typography>

        </Grid>

          </CardContent>
          </Card>
      </Grid>

      <Grid size = {{xs:6}} sx={{ display:"flex", alignItems: 'flex-start', justifyContent: 'center',pl:1, mb: 1}}> 

<Card sx={{backgroundColor: '#ffffff', width:'280px'}}>
    <CardContent>
      <Grid size={{xs:8}}>
            <Typography variant='body1' sx={{fontWeight:400}}>
              remaining balance
            </Typography>
            <Typography variant='h4' sx={{fontWeight:575}}>
              $300 
            </Typography>

        </Grid>
        </CardContent>
        </Card>
      </Grid>

{/* End Row 3 */}
	</Grid>


</>
  )
}