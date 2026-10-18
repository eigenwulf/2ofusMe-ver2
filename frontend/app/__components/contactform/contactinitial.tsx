'use client'
import * as React from 'react';
import { use } from 'react';
import {AppBar, Box, Button, Card, CardMedia, CardContent, CardActions, Checkbox, Container, Divider, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, FormControl, Paper, Stack, Step, StepLabel, Stepper, TextField, Typography} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//next
import Image from 'next/image';
import Link from 'next/link'

//Redux
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { updateCo } from '../../store/features/co_Delete/coSlice';
import { updateRep } from '../../store/features/rep_Delete/repSlice';
import redUnderline from './assets/redUnderline.png';

//react hook form
import { useForm, Controller } from "react-hook-form";

type ContactDetails = {
  name: string;
  company: string;
  phone: string;
  email: string;
  notes: string;
};

export default function ContactInitial() {

//______________________________________________________  REACT HOOK FORM
  const form = useForm ({
    mode: 'onSubmit', // validate field onSubmit
    });

    const { control, formState, handleSubmit, register, watch, getValues} = form;
    const { errors, 
    touchedFields, //object containing all the inputs the user has interacted with.
    dirtyFields, //object with the user-modified fields
    isDirty, //when the form has been changed
    isValid, //Set to true if the form doesn't have any errors.
    isSubmitting, 
    isSubmitted, 
    isSubmitSuccessful, 
    } = formState;

  const watchFields=watch( [ "name", "company", "phone", "email", "notes" ] );

  //______________________________________________________  API
// form of data to send to createRecip{ "name": "John Doe", "street_address": "123 Main St",  }
const onSubmit = async (data: ContactDetails) => {
  console.log(data)
  }

	return (
    <Container maxWidth={false} sx={{ maxWidth:'1250px',px: 1, py: 3 }}>

			<Grid container sx={{ display:"flex", alignItems: 'center', justifyContent: 'space-evenly', mt:5 }}> 

{/* COLUMN 1 ___________________________________*/}

      <Grid size = {{xs:12, md: 5}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ ml:{xs: 4} }}>

          <Typography  variant='h6' sx={{ textAlign: 'left', fontWeight: '650', pb:2}}>
          Questions? Get in touch with us.
          </Typography>

          <Image src={redUnderline} alt="" style={{maxWidth:'350px'}}/>

          <Typography  variant='h6' sx={{ textAlign: 'left'}}>
          email: connect@1dmail.ad<br/>
          whatsapp: @connect_1dmail
          </Typography>

        </Box>			
      </Grid>

{/* COLUMN 2 ___________________________________*/}
      <Grid size = {{xs:12, md: 7}} sx={{display:"flex", alignItems: 'center', justifyContent:'center', backgroundColor:'#fcfcfc' }}> 

      <Grid container component="form" onSubmit={handleSubmit(onSubmit)} sx={{pl:4,pr:4}}>

      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <Grid size={{xs:12 }} sx={{mb:2, mt: 3}}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  label='name' variant='outlined'
                  {...field}
                  fullWidth
                  size='small'
                  error={!!errors.name}
                  helperText={errors.name?.message}  
                  />
                )} />
          </Grid>

        <Grid size={{xs:12}} sx={{mb:2}}>
          <Controller
            name="company"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField label='company' variant='outlined'
              {...field} fullWidth size='small' />
            )}
          />
        </Grid>
        
        <Grid size={{xs:6}} sx={{mb:2, pr: 1}}>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField label='phone' variant='outlined' 
              {...field} fullWidth size='small' />
            )}
          />
        </Grid>

        <Grid size={{xs:6}} sx={{mb:2}}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField label='email' variant='outlined' 
              {...field} fullWidth size='small'/>
            )}
          />
        </Grid>

        <Grid size={{xs:12}} sx={{mb: 2}}>
          <Controller
            name="notes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField label="How can we help you?" multiline rows={7} 
              {...field} fullWidth size='small'/>
            )}
          />
        </Grid>

        {isDirty?(<Button type="submit" variant="outlined">Submit</Button>):(<Button disabled variant="contained">Save</Button>)}
        
      {/* end form and box for form */} 
    {/* </form>  */}
{/* end Grid container */}
</Grid>

      {/* end Grid column2 */}
      </Grid>

{/* end Grid Container */}
      </Grid>
</Container>



  );
}


