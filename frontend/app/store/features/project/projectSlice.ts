// Handles the form data for a card component, allowing it to be saved and cleared as needed.  
//a store of the data for a card in progress, and a list of its recipient ids
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
  id?: number
  // ? marks the key as optional
}


const initialState: { cardObject: CardObject; projectRecips: number[] } = {
  cardObject: {},
  projectRecips: []
};


const projectSlice = createSlice({
name: 'project',
initialState,
reducers:{ 
  
  // greeting card state____________________
    updateCardObject: (state, action) => {
      state.cardObject = action.payload;
    },

    clearCardObject: (state) => {
      state.cardObject = {};
      // state.projectCard = null;
    },

  // chosen recipients state____________________
    updateProjectRecips: (state, action) => {
      state.projectRecips = [ ...state.projectRecips, action.payload ];
      // Creates new object by copying all existing properties from state.formData and then overwrites or adds properties from action.payload.
      // This means any fields in action.payload will update the corresponding fields in formData, while other fields remain unchanged.
    },

    addProjectRecips: (state, action) => {
      state.projectRecips.push(action.payload ); //this also acts as an update with the push
    },

    removeProjectRecips: (state, action) => {
      state.projectRecips = state.projectRecips.filter(pk => pk !== action.payload);
    },

    clearProjectRecips: (state) => {
      state.projectRecips = [];
      // state.projectRecips = null;
    },
},
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      // When PURGE action is dispatched, remove all form data
      state.cardObject = {};
      state.projectRecips = [];
    });
  }  
});

// Export actions
export const { updateCardObject, clearCardObject,
                updateProjectRecips, addProjectRecips, removeProjectRecips, clearProjectRecips } 
                = projectSlice.actions;

// Export reducer to store.js
export default projectSlice.reducer; 


//reminder from tutorial 8: payload is a property added to state
//payload is obtained from the View: dispatch(action(payload))
//In Redux Toolkit, action creators are objects (not functions you call directly), and you use them with dispatch