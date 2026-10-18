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

export default function CampaignSummary( ) {
  
  const company = useSelector( (state: RootState)=>state.co.coData ) 
  const levelDetail = company.current_campaign_level?.[0]?.level

return(
<>
  <Grid container sx={{
      display:"flex", alignItems: 'flex-start', justifyContent: 'center',
      overflow: 'hidden', // ensure no overflow when using objectFit: 'cover
      backgroundColor: '#ffffff', mt:3, borderRadius: '8px', mb:3
    }}> 

{/* COLUMN 1 ___________________________________*/}

      <Grid size = {{xs:12, md: 6}} sx={{ display:"flex", alignItems: 'flex-start', justifyContent: 'center', objectFit: 'contain',pl:1, mb: 1
        }}> 
        <Box sx={{ height: '100%', width:'100%', objectFit: 'contain', px:3, py:1}}>
          <Typography variant='h6'>
            {levelDetail?.level} Campaign Details<br/>
            </Typography>
            <Typography variant='body1'>
            size: {levelDetail?.max_quantity} inserts <br/>
            confirmed mailings: 1,500 <br/>
            remaining inserts: 3,500<br/>
          </Typography>

          <Typography variant='h6' sx={{pt:3}}>
						Pricing <br/>
						</Typography>
						<Typography variant='body1'>
						unit: ${levelDetail?.unit_price} per insert <br/>
						time frame: 6 months, 2 February 2026 - 2 July 2026 <br/>
					</Typography>
        </Box>
      </Grid>

{/* COLUMN 2 ___________________________________*/}
			<Grid size = {{xs:12, md: 6}} sx={{ display:"flex", alignItems: 'flex-start', justifyContent: 'center', objectFit: 'contain', pl:1, mb: 1
				}}> 

				<Box sx={{ height: '100%', width:'100%', objectFit: 'contain',  alignSelf: 'flex-start', px:3, py:1}}>

          <Typography variant='h6' sx={{ }} >
            Advertising Insert Details
            </Typography>


          <Button 
            component={Link} variant="contained" size= 'medium' color="secondary" sx={{ width:'fit-content', height:'fit-content', fontWeight: 700, m: 3}}
            href={`/campaign?level=${levelDetail?.reference_id}`} >
            Manage Campaign
          </Button>



				</Box>
      </Grid>
{/* End Row 3 */}
	</Grid>


{/* ROW 2 ______________________________________________________________________________________________*/}


    <Grid container sx={{display:"flex", alignItems: 'center', justifyContent: 'center', overflow: 'hidden', // ensure no overflow when using objectFit: 'cover
            mb:1, backgroundColor: '#ffffff', borderRadius: '8px', px:3, py:1 }}> 

			<Grid size = {{xs:12}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center', objectFit: 'contain', pl:1, mb: 1 }}> 

				<Box sx={{ height: '100%', width:'100%', objectFit: 'contain', }}>
					<Typography  variant='h6' sx={{ textAlign: 'left'}}>
						Payment Information
					</Typography>

					<Typography variant='body1'>
						Remaining balance: +$1,000<br /><br />
						Original balance: +$1,000<br /><br />
            Billing: <br />
						Coca Cola Marketing Dept<br />
						6 Oak St<br />
						Atlanta, BA 02138	<br /><br />
						Payment method:<br/>
						Visa credit card ending 1234,
						expiring: 10/2027
					</Typography>
				</Box>

			</Grid>


{/* COLUMN 2 ___________________________________*/}
			<Grid size = {{xs:12, md: 6}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'flex-start', objectFit: 'contain', pl:1, mb: 1
				}}> 
				<Box sx={{ height: '100%', width:'100%', objectFit: 'contain', px:3, py:1}}>
					<Typography  variant='body1' sx={{ textAlign: 'left'}}>


					</Typography>
				</Box>					
      </Grid>
	{/*end ROW 2  */}
</Grid>
</>
  )
}