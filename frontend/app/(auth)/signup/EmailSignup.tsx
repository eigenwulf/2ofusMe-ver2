"use client"
import React, { useState } from 'react';
import {AppBar, Box, Button, Grid, Paper, Stack, TextField, Typography} from '@mui/material';

//next
import { useRouter } from 'next/navigation';

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { useRegistrationMutation } from '../../store/features/api/apiSlice'
import { setCredentials } from '../../store/features/auth/authSlice';
import { createSession } from '../../lib/actions';

//React Hook Form
import { useForm, Controller } from "react-hook-form";

  type RegisterData = {
    email: string;
    password: string;
  };

export default function EmailSignup() {

  // const dispatch = useDispatch<AppDispatch>()
  const dispatch = useDispatch()
  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');

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

  const watchFields=watch( [ "name", "street_address", "locality", "state", "postcode" ] );

  //2. onClick Next button: instantiate useLoginMutation hook
  // const [login, { isLoading, isError, error, data }] = useLoginMutation();
  const [registration, { isLoading, isError, error, data }] = useRegistrationMutation();

  //3. register, set authSlice credentials, re-direct to welcome
  const onSubmit = async (data: RegisterData) => {
    console.log(data)
    try {
      const response = await registration(data).unwrap();  //register at apiSlice imported above from useLoginMutation() 
      console.log('response', response)

      // if response contains user data and JWT token, save credentials in authSlice, not used if setting jwt cookies
      dispatch(setCredentials(response) );   

      // Navigate to onboarding/welcome
      router.push('/onboarding/welcome');

    } catch (err) {
      console.error('Signup failed:', err);
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
          name="password1"
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

    {isDirty?(<Button type="submit" variant="contained" >Sign Up</Button>):(<Button disabled variant="contained">Save</Button>)}

          {/* <Button variant="contained" size="medium" type='submit' sx={{ width:'100px', height:'fit-content', fontWeight: 500}}>
            Sign Up
          </Button> */}
      </form>
      <Typography>Already have an account? Login here.</Typography>
    </>

  )}

/*Upon registration, jwt cookie is not set. It redirects to additional registration page.
*/  
