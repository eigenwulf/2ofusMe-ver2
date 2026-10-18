//temporary store of all the recipient addresses collected by user
import { createSlice, PayloadAction, isAction } from '@reduxjs/toolkit'
import { PURGE } from "redux-persist";  

export interface Address {
  id?: number;
  name: string;
  street_address: string;
  apt?: string;
  locality?: string;
  state?: string;
  postcode?: string;
  greetingcards?:number[]; // read-only: returned by API, used to query a list of IDs
  greetingcard_ids: number[]; //write-only, see serializer: used to accept a list of IDs, POST/PUT
  // ? marks the key as optional. Must correspond to RecipientSerializer fields
  }

const initialState: { entries: Address[] } = {  //an array composed of Address type objects
  entries:[], //initial state is one empty array
  }

const addressbookSlice = createSlice({
  name: 'addressbook',
  initialState,
  
  reducers:{
    setAddressBook (state, action: PayloadAction<Address[]>) {
      state.entries = action.payload
    },
    
    addToAddressBook (state, action: PayloadAction<Address>) {
      state.entries.push(action.payload)
    },
      
    clearAddressBook: (state) => {
      state.entries = [];
    }
  },

  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
    // When PURGE action is dispatched, remove all form data
      state.entries = [];
    });
  }  

});

// Export actions to components
export const { setAddressBook, addToAddressBook, clearAddressBook } =addressbookSlice.actions;

// Export reducer to store.js
export default addressbookSlice.reducer; 