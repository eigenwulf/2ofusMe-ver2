import { configureStore } from '@reduxjs/toolkit'
import { listenerMiddleware, startListening } from './listenerMiddleware'
import { createTransform } from 'redux-persist'
import { clearCredentials } from './features/auth/authSlice'
//redux-persist
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'    

import { apiSlice } from './features/api/apiSlice'
import authReducer from './features/auth/authSlice';
import addressbookReducer from './features/addressbook/addressbookSlice';
import projectReducer from './features/project/projectSlice';
import senderReducer from './features/sender/senderSlice';
import newselectionReducer from './features/newselection/newselectionSlice';

//REDUX-PERSIST: in order to persist data through page reloads
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: [apiSlice.reducerPath]  //blacklist apis so they will not be persisted.
    }
    //Rather than persisting the entire Redux state, we can be selective using persistReducer:
    //[https://expertbeacon.com/the-complete-guide-to-redux-persist-for-seamless-state-migration/]

//Not recommended to persist Auth, due to hydrator, see Providers.tsx
// const persistedAuthReducer = persistReducer(persistConfig, authReducer)

//see notes
const apiPersistTransform = createTransform(
  // transform state on its way to being persisted
  (inboundState /* full apiSlice state */) => ({
    queries: inboundState.queries,
  }),
  // transform state coming back out of storage
  (outboundState) => ({
    queries: outboundState.queries ?? {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: outboundState.config,
  }),
  { whitelist: [apiSlice.reducerPath] } // only apply to this reducer
)

const persistedSenderReducer  = persistReducer({ key: 'sender',  version: 1, storage }, senderReducer);
const persistedAddressbookReducer  = persistReducer({ key: 'addressbook',  version: 1, storage }, addressbookReducer);
const persistedProjectReducer = persistReducer({ key: 'project', version: 1, storage }, projectReducer);
const persistedNewSelectionReducer = persistReducer({ key: 'newselection', version: 1, storage }, newselectionReducer);

const persistedApiReducer = persistReducer(
  { key: apiSlice.reducerPath, version: 1, storage, transforms: [apiPersistTransform] },
  apiSlice.reducer
)

//The store is created by passing in a reducer, and has a method called getState that returns the current state value:
const store = configureStore({
	reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer, //computed property: allow use of values of expressions as property names of an object.
    [apiSlice.reducerPath]: persistedApiReducer, // instead of apiSlice.reducer
    auth: authReducer,
    addressbook: persistedAddressbookReducer,
    newselection: persistedNewSelectionReducer,
    project:  persistedProjectReducer,
    sender:   persistedSenderReducer,
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware(
                {
                serializableCheck: {  //One of the core usage principles for Redux is that you should not put non-serializable values in state or actions.
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],}, //If using Redux-Persist, you should specifically ignore all the action types it dispatches: [https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist]
                }
        )
        .prepend(listenerMiddleware.middleware)
        .concat(apiSlice.middleware) //adds api middleware
        // .concat(thunk)
    //This refers to the middleware provided by the apiSlice, which is likely from Redux Toolkit's createApi function. The createApi function, when used, provides middleware that handles things like making API requests, caching responses, handling loading and error states, etc.
    //ensures that the apiSlice's middleware is included in the middleware pipeline of the store, allowing the store to manage API interactions effectively.

    //getDefaultMware is a function from configureStore. lists the pre-installed mware
    // .concat() an array method that combines multiple arrays or items into one. In the case of the Redux store configuration, it’s being used to combine middleware functions.
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

const persistor = persistStore(store)

// startListening({
//   actionCreator: clearCredentials, //Catches when clearCredentials is invoked, both the auto-logout in baseQueryWithReauth and any future manual logout buttons with a single hook
//   effect: (_action, listenerApi) => {
//     listenerApi.dispatch(apiSlice.util.resetApiState())  //apiSlice.util.resetApiState()	Clears the in-memory RTK Query cache (tags, cached responses)
//     persistor.purge() //wipes co and rep from localStorage and triggers persist/PURGE which both slices already handle in their extraReducers
//   },
// });

export { store, persistor } //for use in index.js as <Provider store=>

//The Redux store has a method called dispatch. The only way to update the state is to call store.dispatch() and pass in an action object. 
//The store will run its reducer function and save the new state value inside, and we can call getState() to retrieve the updated value:

// Infer the `RootState` and `AppDispatch` types from the store itself: nstead of manually writing out what your state looks like (which would be tedious and error-prone), this automatically figures it out from your store. 
// This creates a type called RootState that represents the shape of your entire Redux store's state.
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
//typeof store.dispatch gets the type of that function, AppDispatch becomes that type
//Instead of writing const dispatch = useDispatch(), write const dispatch = useDispatch<AppDispatch>() to get full type safety when dispatching actions.
export type AppDispatch = typeof store.dispatch

//To persist the RTK Query cache
//1. Create a persisted reducer for the api slice, but with a transform — RTK Query's state includes queries, mutations, provided, subscriptions, and config. You generally do not want to persist subscriptions (component ref-counts, meaningless after reload) or config (online/focus flags) — only queries (and optionally mutations) are useful to restore: