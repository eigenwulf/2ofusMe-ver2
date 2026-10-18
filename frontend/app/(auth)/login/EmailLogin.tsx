//upon login success, 1. load auth user 2. navigate to personalize(if newselection in store) or dashboard(if newselection not in store): 
"use client"
import React, { useState } from 'react';
import {AppBar, Box, Button, Grid, Paper, Stack, TextField, Typography} from '@mui/material';
import { useRouter } from 'next/navigation';
// import {AppDispatch} from '../store/store.tsx'

//Redux
import { useLoginMutation, useLazyRetrievegreetingcardQuery, useLazyListrecipientsQuery } from '../../store/features/api/apiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../store/features/auth/authSlice';

//React Hook Form
import { useForm, Controller } from "react-hook-form";

//typescript
  type LoginData = {
    email: string;
    password: string;
  };

export default function EmailSignup() {

  //TODO WHEN SUCCESSFUL LOGIN, LOAD INTO STORE: PROJECT, RECIPIENT, SENDER
//Redux
  // const dispatch = useDispatch<AppDispatch>()
  const dispatch = useDispatch()
  const router = useRouter()

// Api 
  const [login, { isLoading, isError, error, data }] = useLoginMutation();
  // for on-demand triggering, use lazy hooks for queries. No need for lazy with mutations, they are already lazy
  //const [listRepco, { data: resultRepCoList }] = useLazyListrepcoQuery();

  const [listGreetingcards] =  useLazyRetrievegreetingcardQuery();
  const [listRecipients] =  useLazyListrecipientsQuery();

  

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

  // const watchFields=watch( [ "name", "street_address", "locality", "state", "postcode" ] );

  //Procedure: 1. login via api, 2. retrieve Rep-Co assignment, 3. retrieve Rep and Co separately, 4. dispatch auth Rep and Co to store 
  //2. onClick: Login to api

    //load greetingcard object, load sender address, 

  const onSubmit = async (data: LoginData) => {
    console.log(data)
    try {
      const loginResult = await login(data).unwrap();  //unwrap triggers catch if error
      dispatch(setCredentials(loginResult) ); //store authuser pk, username, email  

      //4. retrieve RepCo, Rep, Co, and LevelDetail from api  
      // const repcoResult = await listRepco().unwrap();
      // if (!repcoResult.length) {
      //   router.push('/onboarding/welcome') //if no RepCo, early redirect to onboarding
      //   return
      // }

      // const repResult = await retrieveRep(repcoResult[0].rep).unwrap() //unwrap presents the data only, excluding the error, isLoading, etc.
      // const coResult = await retrieveCo(repcoResult[0].company).unwrap()  
      // const levelResult = await getLevel(coResult.id).unwrap()

      // console.log('repcoResult', repcoResult)
      // console.log('coResult', coResult) 
      // console.log('levelResult', levelResult)

//5. store Co, Rep

      // dispatch(updateRep(repResult) );   
      // dispatch(updateCo(coResult) ); //set Co, then current_campaign_level is modified to include full CompanyCampaignLevel with nested LevelDetail in next line
      // dispatch(updateCo({ current_campaign_level: levelResult }) );

      // Navigate to dashboard 
      router.push('/');

    } catch (err) {
      console.error('Login failed:', err);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction='row' spacing={3} sx={{ alignItems: "center"}}>
      
          <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              error={!!errors.recipient}
              helperText={errors.recipient?.message}  />
            )} />

          <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              size='small'
              error={!!errors.recipient}
              helperText={errors.recipient?.message}  />
            )} />

          {/* <TextField id="email" label="Email" type="email" required variant="outlined" size="small" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ borderColor:'primary.dark', alignSelf: "stretch", width: "60%",}}/>
          <TextField id="password1" label="Password" type="password" required variant="outlined" size="small" value={password1} onChange={(e) => setPassword1(e.target.value)} sx={{ borderColor:'primary.dark', alignSelf: "stretch", width: "40%",}}/>
       */}
      
        </Stack>

    {isDirty?(<Button type="submit" variant="contained" >Login</Button>):(<Button disabled variant="contained">Login</Button>)}

      </form>
      <Typography>Need to register new account? Sign up here.</Typography>
    </>

  )}
