//concept: Presents form for sender address. If logged, presents current sender address.
'use client'
import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Stack, TextField, Typography, Paper, } from '@mui/material';
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
//nextjs
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { StaticImageData } from 'next/image'
import Link from 'next/link'
//Redux
import { useSelector, useDispatch } from 'react-redux'
import { updateSenderAddress } from '../../../store/features/sender/senderSlice';
import { useCreatesenderMutation, useRetrievesenderQuery, useUpdatesenderMutation } from '../../../store/features/api/apiSlice';

import envelope from '../..//../assets/images/backgrounds/Envelope_Traditional.png';


// begin component___________________________________________________________________
export default function SenderEnvelope () {

  const navigate = useNavigate(); 
  const dispatch = useDispatch()
  const auth_user = useSelector( (state)=>state.auth.user ) //loggedin user object from authSlice

  // initialize api hooks
  const [createSender, { isloading, isSuccess: createSuccess, error: createError} ] = useCreatesenderMutation()  //createRecip is special promise with an unwrap method. isSuccess *see note
  const [updateSender, { isSuccess: updateSuccess, error: updateError} ] = useUpdatesenderMutation()

  //1. make call to api to retrieve sender address, if exists
  const { data: existSenderData, isSuccess } = useRetrievesenderQuery(auth_user.pk) 

  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      sendername: "Kayla Joy Turney",
      street_address: "6 Oak Street",
      locality: "Springfield",
      state: "Illinois",
      post_code: "12345"
    }
  });

  //set up RHF 
  const { control, formState, handleSubmit, register, reset, watch, getValues } = form;

  // When data is loaded, reset the form with the new values
  useEffect(() => {
    if (existSenderData) {
      reset({
        sendername: existSenderData.sendername,
        street_address: existSenderData.street_address,
        locality: existSenderData.locality,
        state: existSenderData.state,
        post_code: existSenderData.post_code
      });

    }
  }, [existSenderData, reset]);

  //3. specify handler to save sender to store
  const handleSavetoReduxState = () => { 
    dispatch(updateSenderAddress(getValues() ))  //dispatch saves to store, getValues is a RHF method that returns form data
    console.log('object saved to redux ', getValues())
    };
  
  //4. Submit method contingent upon existing sender existence

  const onSubmit = async (data) => {
  try {
    let result;
    data.customuser=auth_user.pk;

    if (existSenderData) {
      result = await updateSender({id: auth_user.pk, ...data});
      navigate('/recipients');
    } else {
      result = await createSender(data);
      navigate('/recipients');
    }
    if ('data' in result) {
      dispatch(updateSenderAddress(result.data));
    }
  } catch (err) {
    console.error('Failed to save post: ', err);
  }
};


  const { errors,
    touchedFields, //object containing all the inputs the user has interacted with.
    dirtyFields, //object with the user-modified fields
    isDirty, //when the form has been changed
    isValid, //Set to true if the form doesn't have any errors.
    isSubmitting, 
    isSubmitted, 
    isSubmitSuccessful, 
    isSubmitSuccessfulbmitCount
  } = formState;

  const watchFields=watch( [ "sendername", "street_address", "locality", "state", "post_code" ] );

  return (
    <Card sx={{ minWidth: 400, 
      // display: 'flex',
      justifyContent: 'center',
      }}>

    <Grid container 
      sx={{
      alignItems: 'center',
      justifyContent: 'center',}}
      >

  {/* column 1 */}
      <Grid size={{xs:12, sm:12, md:8}} 
						sx={{ display: "flex", 
						alignItems: 'center',
						alignContent:'center',
						border:1,
						}} >

  {/* CardMedia: Image container for envelope*/}
        <Box sx={{ position:'relative'}}>
          <CardMedia
            component="img"
            alt="chosen_one"
            sx={{ 
              width: {  }, 
                // minWidth:'400px', 
                paddingX:'20',
                // display: 'flex',
                backgroundSize: 'contain',  // Ensures the image fits within the box
                backgroundRepeat: 'no-repeat', // Prevents repeating the image
                backgroundPosition: 'center', // Centers the image
              }}
            image={envelope}
            title="your chosen one"
          />
  {/* box for sender address at top left */}
          <Box sx={{
              zIndex: 'tooltip',
              position:'absolute',
              top: '10%',
              left: '10%',
              border: '2px dashed grey',
              padding: '10px',
              textAlign: 'left', 
              maxWidth: '50%'
              }}>
            <Typography sx={{ typography: { sm: 'h6', xs: 'body1' } }} >
              <div>{watchFields[0]}</div>
              <div>{watchFields[1]}</div>
              <div>{watchFields[2]}, {watchFields[3]} {watchFields[4]}</div>
            </Typography>
        </Box>
      </Box>
    </Grid>

{/* column 2 */}
      <Grid size={{xs:12, sm:12, md:4}} 
						sx={{ display: "flex", 
						alignItems: 'center',
						alignContent:'center',
						border:1,
						}} >
        <Stack spacing={2}> 
          <CardContent>
            <Typography gutterBottom variant="h9" component="div">
              Sender Return Address
            </Typography>
          </CardContent>

{/* form */}
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div class="form-control">

          <TextField 
          id="standard-basic" 
          label="name"
          type="text"
          variant="standard" 
          {...register("sendername", {
            required: "Sender's name is required",}
                      )
          }
          error={!!errors.name}
          helpterText={errors.name?.message}
          onBlur = {handleSavetoReduxState}
          />
          {/* <Typography className="error">{errors.name?.message}</Typography> */}

          <TextField 
          id="standard-basic" 
          label="street address"
          type="text"
          variant="standard" 
          {...register("street_address", {
            required: "Street address is required",}
                      )
          }
          error={!!errors.street}
          onBlur = {handleSavetoReduxState}
          helpterText={errors.street?.message}
          />

          <TextField 
          id="standard-basic" 
          label="city"
          type="text"
          variant="standard" 
          {...register("locality", {
            required: "City is required",}
                      )
          }
          error={!!errors.locality}
          onBlur = {handleSavetoReduxState}
          helpterText={errors.locality?.message}
          />

          <TextField 
          id="standard-basic" 
          label="state"
          type="text"
          variant="standard" 
          {...register("state", {
            required: "State is required",}
                      )
          }
          error={!!errors.state}
          onBlur = {handleSavetoReduxState}
          helpterText={errors.state?.message}
          />

          <TextField
          id="standard-basic" 
          label="zip code"
          variant="standard"
          {...register("post_code") }  
          error={!!errors.post_code}
          onBlur = {handleSavetoReduxState}
          helpterText={errors.post_code?.message}/>

          {/* <TextField
          id="standard-basic" 
          label="sender"
          type="hidden"
          variant="standard"
          {...register("customuser", {value:auth_user.pk}) }  /> */}

{/* if sender exists button is active, else button is inactive until dirty*/}

{/* component to materialize either a button with dirty condition or a normal based on existSenderData */}
          <> {    
          existSenderData 
          ? <Button type="submit" variant="contained">Save</Button>
          : 
            isDirty 
            ? <Button type="submit" variant="contained">Save</Button>
            : <Button disabled variant="contained">Save</Button>
            }           
          </>

      </div>
        </form>
        <p></p>
        <DevTool control={control} />
      </Stack>

      </Grid>
    </Grid>
    </Card>
    )
  }


  // EXAMPLE OF MANUAL FETCH METHOD
  // const onSubmit = async (data) => {
  //   data.customuser=auth_user.pk
  //   console.log("jsoned data" + JSON.stringify({"card_stock":1, ...data}))
  //   try {
  //               //waits until the request completes
  //       const response_post = await fetch(`http://127.0.0.1:8000/accounts/sender_get_post/${auth_user.pk}/`, {
  //       method: "POST",
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       //make sure to serialize your JSON body
  //       body: JSON.stringify({"card_stock":1, ...data})
  //       // body: JSON.stringify(data)
  //     });
  //       if (!response_post.ok) { throw new Error(`Http error: ${response_post.status}`)};
  //       const result = await response_post.json();
  //       console.log('SenderEnvelope.js onSubmit(): success_response', result);
  //       navigate('/Recipients')
  //     }
  // catch (error) {
  //     console.log(error.message)
  //   }
  // };