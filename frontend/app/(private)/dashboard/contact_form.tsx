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

//react hook form
import { useForm, Controller } from "react-hook-form";
import CampaignSummary from './campaign_summary';

type AccountProfileDetailsData = {
  name: string;
  street: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
};

export default function Dashboard( ) {
  const rep = useSelector ( (state: RootState)=>state.rep) //Obtain current greetingcard.

  //______________________________________________________  REACT HOOK FORM
  const form = useForm ({
    mode: 'onSubmit', // validate field onSubmit
    defaultValues: {
      name: "Spiderman",
      street_address: "10 Maple Street", 
      locality: "Chicago",
      state: "Illinois",
      postcode: "12345",
      }
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

  const watchFields=watch( [ "name", "street_address", "locality", "state", "postcode" ] );

  //______________________________________________________  API
// form of data to send to createRecip{ "name": "John Doe", "street_address": "123 Main St", "greetingcard_ids": [1, 2, 3] }
const onSubmit = async (data: AccountProfileDetailsData) => {
  console.log(data)
  }

  return (
    
    // <Container maxWidth={false} sx={{ maxWidth:'1200px', bgcolor: 'transparent', pb:3}}>
    <>

{/* ROW 1 ______________________________________________________________________________________________*/}

  <Grid container sx={{display:"flex", alignItems: 'center', justifyContent: 'flexStart', overflow: 'hidden', // ensure no overflow when using objectFit: 'cover
            mb:1, backgroundColor: '#ffffff', borderRadius: '8px', px:3, py:1 }}> 

      <Grid size = {{xs:12}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'flexStart', objectFit: 'contain', mb: 1}}> 
        {/* <Box sx={{ height: '100%', width:'100%', objectFit: 'contain', px:3, py:1}}> */}
        <Typography variant='h6' textAlign='left'>
          Profile <br/>
        </Typography>
      </Grid>

  <Box sx={{ height: '100%', width:'60%', objectFit: 'contain', }}>

  <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" sx={{mb:2}}>
          <Grid size={{xs:1.75}}>
            <Typography>Name: </Typography>
          </Grid>

          <Grid size={{xs:10.25 }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Recipient name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size='small'
                  error={!!errors.recipient}
                  helperText={errors.recipient?.message}  />
                )} />
          </Grid>
        </Stack>

      <Stack direction="row"sx={{mb:2}}>
        <Grid size={{xs:1.75}}>
          <Typography>Street: </Typography>
        </Grid>

        <Grid size={{xs:10.25}} >
          <Controller
            name="street_address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} fullWidth size='small' />
            )}
          />
        </Grid>

      </Stack>

      <Stack direction="row"sx={{mb:2}}>
        <Grid size={{xs:1.75}}>
          <Typography>City: </Typography>
        </Grid>
        
        <Grid size={{xs:6}} sx={{mr:4}}>
          <Controller
            name="locality"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} fullWidth size='small' />
            )}
          />
        </Grid>

        <Grid size={{xs:1}}>
          <Typography>State: </Typography>
        </Grid>

        <Grid size={{xs:2.25}}>
          <Controller
            name="state"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} fullWidth size='small'/>
            )}
          />
        </Grid>
      </Stack>

      <Stack direction="row"sx={{mb:2}}>
        <Grid size={{xs:1.75}}>
          <Typography>Zip Code: </Typography>
        </Grid>

        <Grid size={{xs:4}}>
          <Controller
            name="postcode"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} fullWidth size='small'/>
            )}
          />
        </Grid>
      </Stack>

        {isDirty?(<Button type="submit" variant="outlined" color="tertiary">Save</Button>):(<Button disabled variant="contained">Save</Button>)}
          <Button variant="outlined" color="secondary" sx={{ color: 'warning.dark', borderColor: 'secondary' }}>
            Cancel
          </Button>
        
      {/* end form and box for form */} 
    </form> </Box>
{/* end grid container for column 1 */}
  </Grid>

{/* </Container> */}
    </>
  )
}
