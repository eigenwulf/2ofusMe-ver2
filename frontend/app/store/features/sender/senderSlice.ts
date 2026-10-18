// Purpose: to avoid losing form inputs on refresh. This slice will save form data to redux store when onBlur is triggered in a form field.
// This slice will handle the form data for a recipient_envelope component, allowing it to be saved and cleared as needed.  
// Note: Sending form data to API happens in apiSlice, not here.
import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from "redux-persist";  

export interface Sender {
  id?: number;
  name?: string;
  street_address?: string;
  apt?: string;
  locality?: string;
  state?: string;
  postcode?: string;
}

const initialState: {formData: Sender } ={
    formData:{},
  };

const senderSlice = createSlice({
name: 'sender',
initialState,
reducers:{ 
    updateSenderAddress: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
      // It creates a new object by copying all existing properties from state.formData and then overwrites or adds properties from action.payload.
      // This means any fields in action.payload will update the corresponding fields in formData, while other fields remain unchanged.
    },

    clearSenderAddress: (state) => {
      state.formData = {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      // When PURGE action is dispatched, remove all form data
      state.formData = {};
    });
  }  
});

// Export actions
export const { updateSenderAddress, clearSenderAddress } = senderSlice.actions;
// Export reducer to store.js
export default senderSlice.reducer; 