//Sets and clears user credentials and user details, see logindialog.js
//Takes a JWT from a login mutation, then setting that in our store. We then use prepareHeaders to inject the authentication headers into every subsequent request.
// import { PURGE } from "redux-persist";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../store.ts'

type User = {
  pk: number
  email?: string
  [key: string]: unknown // Allow additional properties
}

type authState = {
  user: User | null
  // access: string | null
  // refresh: boolean | null
  // token: string | null
}

const initialState = {
  user: null,
  // access: null,  //accessible as auth.access, auth is name of this slice, access from state.access
  // refresh: null,
  // token: null
} as authState //type assertion


const authSlice = createSlice({
  name: 'auth', //name of state, name of reducer to be exported to store.js as authReducer
  initialState,
  
  reducers: {
    setCredentials: (state, action) => {  //saves user and access/refresh tokens to store.js upon login
      state.user = action.payload.user; //action.payload is server response data 
      // state.access = action.payload.access;
      // state.refresh = action.payload.refresh; 
      // state.token = action.payload.access;
    },
    clearCredentials: (state) => {  //removes token from store
      state.user = null;

    },
  },
    // extraReducers: (builder) => {
    //   builder.addCase(PURGE, () => {
    //   return initialState;
    // });
  // },
})
//The action parameter here contains a payload property, which holds the value returned by the fetchUser thunk.
//Since the fetchUser thunk is returning response.data from the axios GET request, action.payload will be the data from the server’s response.

//actions for export
export const { setCredentials, clearCredentials } = authSlice.actions

//reducer for export
export default authSlice.reducer

//state for export, can also access in view with useSelector( (state)=>state.auth.user )
export const selectCurrentUser = (state: RootState) => state.auth.user