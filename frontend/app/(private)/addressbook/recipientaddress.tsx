//purpose: Form for new Recipients with real-time updates to recipient_table component. API save to Receipient model
//Store: save form data onBlur to avoid form input loss on refresh
'use client'
import React, { useState, useContext, useEffect } from 'react';
//MUI
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Grid, Stack, TextField, Typography, Paper, } from '@mui/material';
//react hook form
import { useForm, Controller } from "react-hook-form";
//nextjs
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { StaticImageData } from 'next/image'
import Link from 'next/link'
//Redux
import type { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { useRetrievesenderQuery, useListrecipientsQuery, useCreaterecipientMutation, useRecipcreatelinkMutation } from '../../store/features/api/apiSlice';
import { setAddressBook, addToAddressBook } from '../../store/features/addressbook/addressbookSlice';
import { addProjectRecips } from '../../store/features/project/projectSlice';


type RecipientFormData = {
  name: string;
  street_address: string;
  apt?: string;
  locality: string;
  state: string;
  postcode: string;
  greetingcard_ids?: number[];
}

export default function RecipientAddress () {

  //REACT HOOK FORM____________________________________________________________________  
  const form = useForm<RecipientFormData> ({
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
    isSubmitSuccessfulbmitCount } = formState;

  const watchFields=watch( [ "name", "street_address", "locality", "state", "postcode" ] );

//_____________________________________________________________________________________________________________Redux Store
const dispatch = useDispatch() //dispatch modifies the store
const auth_user = useSelector( (state:RootState)=>state.auth.user ) //useSelector obtains values from store, loggedin user object from authSlice
const project = useSelector ( (state:RootState)=>state.project ) //yields - cardFormData: { id: 65, title: "1Baby", cardstyle: 3, fields:[] }

//retrieve sender if exists, to populate form  TODO: MOVE TO SENDER COMPONENT
const { data:senderData, error: senderError, isLoading } = useRetrievesenderQuery(auth_user?.pk, { skip: !auth_user })
//RTK Query hooks can't be called conditionally, so you should also check if useRetrievesenderQuery accepts undefined. The standard pattern is to pass undefined and use the skip option:
// const { data:senderData, error: senderError, isLoading } = useRetrievesenderQuery(auth_user.pk)  //returns an object like this: { data: { ...userdata... }, error: ..., isLoading: true/false,}
//destructuring above is equivalent to: const result = useGetsenderaddressQuery(auth_user.pk); const sender = result.data; const sender_error = result.error; const sender_isLoading = result.isLoading;

// create recipient in API, then update STORE in addressbook, AUTOMATICALLY RE-RENDERS UI
// const onSubmit = async (formdata: FormData) => {console.log(formdata)}


//API_________________________________________________________________________________
const [createRecip, { isloading, isSuccessful, err} ] = useCreaterecipientMutation()  //createRecip is special promise with an unwrap method. isSuccess *see note

// form of data to send to createRecip{ "name": "John Doe", "street_address": "123 Main St", "greetingcard_ids": [1, 2, 3] }
const onSubmit = async (data: RecipientFormData) => {

  // if (project.cardObject && Object.keys(project.cardObject).length > 0) { //checks if projectCard is not empty, then modifies payload
  //   data.greetingcard_ids = [project.cardObject.id]; //appends greetingcard_ids list which will annotate join table in backend
  // }

  if (project.cardObject?.id != null) { //checks if projectCard is not empty, then modifies payload
    data.greetingcard_ids = [project.cardObject.id]; //appends greetingcard_ids list which will annotate join table in backend
  }

  // API
  try {
    const result = await createRecip(data) //api call
    if ('data' in result) {
      console.log('create recipient data and result', data, result)
      //STORE: save to addressbook, project.projectRecips
      dispatch( addToAddressBook(result.data) );
      //c) update project.projectRecips Store:
      dispatch(addProjectRecips (result.data.id) );
    }
  } catch (err) { console.error('Failed to save post: ', err)}
}

//_____________________________________________________________________________________________________
  return (
  <Container>
    <Card sx={{ minWidth: 400 }}>

      <Box sx={{display: 'flex',justifyContent: 'center', alignContent:'stretch', m:2}}>
        <Typography variant="h5">Address Book</Typography>
      </Box>
            <Stack direction="row" spacing={2} >
              <Typography>Send a link for recipients to fill out</Typography>
              <Box sx={{ display: 'flex', border:1, borderColor: 'grey.400' }}>
                  Link to send to recipients
              </Box>       
            </Stack> 

{/* container for manual address input */}
<form onSubmit={handleSubmit(onSubmit)}>
  <Box sx={{ mt: 2, p: 2, maxWidth: 800,  }}>
    <Typography sx={{ display: 'flex', justifyContent: 'center'}}>
      Enter addresses for recipients</Typography>

    <Grid container spacing={0}
    sx={{ minWidth: 400, 
    display: 'inline-flex',
    justifyContent: 'flex-start',
    }}
    >
      
      <Grid size={{xs:12}} sx={{pb:2}}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Recipient name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Recipient Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{xs:8}} sx={{pb:2}}>
        <Controller
          name="street_address"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Street" fullWidth />
          )}
        />
      </Grid>

      <Grid size={{xs:4}} sx={{pb:2}}>
        <Controller
          name="apt"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Apt/Suite" fullWidth />
          )}
        />
      </Grid>

      <Grid size={{xs:8, md:7}} sx={{pb:2}}>
        <Controller
          name="locality"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="City" fullWidth />
          )}
        />
      </Grid>

      <Grid size={{xs:4, md:2}} sx={{pb:2}}>
        <Controller
          name="state"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="State/Region" fullWidth />
          )}
        />
      </Grid>

      <Grid size={{xs:4, md:3}} sx={{pb:2}}>
        <Controller
          name="postcode"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Zip" fullWidth />
          )}
        />
      </Grid>

    </Grid>

    <Box sx={{display:'flex', justifyContent:'center'}}>
      {isDirty?(<Button type="submit" size="small" variant="contained" color="secondary" sx={{width:'80px', mr:3}}>Save</Button>):(<Button disabled variant="contained">Save</Button>)}

        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
    </Box>

  </Box>
  </form>
{/* Saved Addresses Section */}

    <Card variant="outlined"></Card>

  </Card>
  <Divider />

  </Container>
  )
}

/* .unwrap(): 
from chat: By default, the promise returned by addRecip(data) always resolves, even if the request fails (it returns a "fulfilled" or "rejected" action object, not a thrown error).
.unwrap() transforms this behavior:
If the request is successful, it returns the actual response data. If the request fails, it throws the error, allowing you to use try/catch for error handling just like with a regular async function.

isSuccess:
isSuccess is a stateful value managed by RTK Query.
Access it in the component body or in a useEffect, not immediately after the async call.
For immediate logic after the mutation, use the resolved value from await addRecip(data).unwrap(). For UI updates based on mutation status, use isSuccess in a useEffect.
*/

/* The field object contains props and event handlers (value, onChange, etc.) 
that connect your input (TextField) to the form state managed by react-hook-form. */