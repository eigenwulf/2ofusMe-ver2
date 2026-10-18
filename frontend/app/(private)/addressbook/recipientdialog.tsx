//This dialog recieves recipPk as prop from RecipientSummary or RecipientTable. 
// 1. retrieve recipPk object, 2. pre-fill form, 3. update any changes to api, 4. update store
'use client'
import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, TextField } from '@mui/material';
//react hook form
import { useForm, Controller } from "react-hook-form";
//nextjs
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { StaticImageData } from 'next/image'
import Link from 'next/link'
//Redux
import type { RootState } from '../../store/store'; //type for state data
import type { Address } from '../../store/features/addressbook/addressbookSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdaterecipientMutation, useCreaterecipientMutation, useDeleterecipientMutation } from '../../store/features/api/apiSlice';

interface RecipientDialogProps {
  open: boolean;
  onClose: () => void;
  addressProp: {
    id: number | string;
    name: string;
    street_address: string;
    locality: string;
    state: string;
    postcode: string;
  } | null;
}

export default function RecipientDialog ({ open, onClose, addressProp }: RecipientDialogProps) {
  
  //1. Obtain object from addressbook store using recipPk prop.
  // const addressbook = useSelector ( (state:RootState)=>state.addressbook )
  // const recipDetail = addressbook.entries.find(i=> recipPk===i.pk);

const [errorOpen, setErrorOpen] = useState<boolean>(false);

  //2a. Setup REACT HOOK FORM
  const form = useForm ({
    mode: 'onSubmit', // validate field onSubmit
    defaultValues: {
      name: addressProp ? addressProp.name : "",
      street_address: addressProp ? addressProp.street_address : "",
      locality: addressProp ? addressProp.street_address : "",
      state: addressProp ? addressProp.street_address : "",
      postcode: addressProp ? addressProp.street_address : "",   
      id: addressProp ? addressProp.id : ""
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

//2b. reset form when recipDetail becomes available [TODO: NECESSARY?]
useEffect(() => {
  if (addressProp) {
    form.reset({
      name: addressProp.name || "",
      street_address: addressProp.street_address || "",
      locality: addressProp.locality || "",
      state: addressProp.state || "",
      postcode: addressProp.postcode || "",
      id: addressProp.id || "",
    });
  }
}, [addressProp, form]);

//3. a) UPDATE RECIPIENT: onSubmit, update recipient via apiSlice
// DELETE
// const greetingcard = useSelector ( (state)=>state.greetingcard ) //obtain greeting card redux object: yields - cardFormData: { id: 65, title: "1Baby", cardstyle: 3, fields:[] }

const [updateRecip, { isloading, isSuccessful, err} ] = useUpdaterecipientMutation()  //updateRecip is special promise with an unwrap method. isSuccess *see note
const [deleteRecip, { isSuccess: deleteSuccess, error: deleteError} ] = useDeleterecipientMutation()  

const onSubmit = async (data:Address) => {
  console.log('recipient onSubmit data');
  //a) create recipient update
  try {
    const result = await updateRecip({ id: addressProp?.id, ...data }) //With .unwrap(), it will resolve to the value of the fulfilled action, or throw on a rejected action, but not in this case
    onClose()
  } catch (err) { console.error('Failed to save post: ', err)}
}

//3. b) REMOVE RECIPIENT from mailing list: remove entry from Recipient model greeting_card field many-to-many array [TODO: NOT NECESSARY DUE TO CASCADE?]
const onRemove = async () => {
//make api call to retrieve all chosen recipients for this card, then remove the specified entry

  // data.greeting_card=[greetingcard.cardChosen.id] //modifies the payload to include an update to the greeting_card many-to-many field, must use list notation
  // const data = {recipPk, greeting_card: []}

  try {
    const result = await deleteRecip(addressProp?.id);
    if (deleteSuccess){console.log('delete success')}
    onClose()
    } catch (deleteError) { console.error('Failed to delete post: ', err); setErrorOpen(true)}
  }

  return(
    <Dialog
      open={open}
      onClose={onClose}
      // slotProps = {{ //*see below
      //     paper: {
      //       component: 'form',
      //       onSubmit: (event)=> {
      //         event.preventDefault();
      //         // handleSubmit(event)
      //       }
      //     }
      //   }}   
    >
      <DialogTitle>Recipient Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can edit the recipient's address 
          </DialogContentText>

<div>
<form onSubmit={handleSubmit(onSubmit)}>
  <Grid container spacing={0}
      sx={{ minWidth: 400, 
      border:1,
      display: 'inline-flex',
      justifyContent: 'flex-start',
      }}
      >
        <Grid size={{xs:12}} sx={{py:2}}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Recipient name is required" }}
            render={({ field }) => (
              <TextField
                // {...field} same as: 
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                name={field.name}
                inputRef={field.ref}
                label="Recipient Name"
                fullWidth
                error={!!errors.recipient}
                helperText={errors.recipient?.message}
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

        <Grid size={{xs:12}} sx={{ display: "flex", gap: 2 }}>
          {isDirty?(<Button type="submit" variant="outlined">Update</Button>):(<Button disabled variant="contained">Save</Button>)}
        </Grid>
  </Grid>
</form>

</div>
        </DialogContent>
        <DialogActions sx={{mr:5}}>
          <Button color="warning" onClick={onRemove}>Remove Recipient</Button>
        </DialogActions>

  <Snackbar open={errorOpen} autoHideDuration={4000} onClose={() => setErrorOpen(false)}>
    <Alert severity="error">Failed to update address. Please try again.</Alert>
  </Snackbar>


    </Dialog>




  )
}

/* The {...field} field object contains props and event handlers (value, onChange, etc.) 
that connect your input (TextField) to the form state managed by react-hook-form. */

// slotProps: The slotProps prop in MUI components (like <Dialog />) allows you to pass props directly to the internal subcomponents (slots) that make up the parent component. This gives you fine-grained control over the behavior and appearance of those internal elements. 
// 1. sets the component to 'form', making the dialog's paper act as a <form>.
// 2. attaches an onSubmit handler to the form

// On the PUT method, we are not throwing an exception if an identifier is not found. 
// But in the PATCH method, we are throwing an exception if the identifier is not found.