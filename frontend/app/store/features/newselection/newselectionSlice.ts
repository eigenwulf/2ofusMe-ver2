//Purpose: to store the current selection and its personalization prior to being saved as project.  
// clears when navigating to addressbook page or if project exists

import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from "redux-persist";  

export interface CardField {
  order: string;
  field: string;
  text: string;
  font: string;
  fontSize: number;
  color: string;
  positionTop: string;
}

export interface CardObject {
  fields?: CardField[];
  title?: string;
  image?: string;
  // ? marks the key as optional
}

const initialState: { cardObject: CardObject } = {
  cardObject: {},
};


const newselectionSlice = createSlice({
name: 'newselection',
initialState,
reducers:{ 
  
  // greeting card state____________________
    updateNewSelection: (state, action) => {
      state.cardObject = action.payload;
    },

    clearNewSelection: (state) => {
      state.cardObject = {};
      // state.projectCard = null;
    },

},
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      // When PURGE action is dispatched, remove all form data
      state.cardObject = {};
    });
  }  
});

// Export actions
export const { updateNewSelection, clearNewSelection, } 
                = newselectionSlice.actions;

// Export reducer to store.js
export default newselectionSlice.reducer; 


//reminder from tutorial 8: payload is a property added to state
//payload is obtained from the View: dispatch(action(payload))
//In Redux Toolkit, action creators are objects (not functions you call directly), and you use them with dispatch