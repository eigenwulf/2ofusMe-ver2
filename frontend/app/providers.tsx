'use client';
import * as React from 'react';
import { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import { myTheme } from './myTheme';
import { theme } from './theme';
import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useDispatch } from 'react-redux'
import { useGetUserQuery } from './store/features/api/apiSlice';
import { setCredentials } from './store/features/auth/authSlice';

function AuthHydrator() {
  const dispatch = useDispatch();
  const { data: user } = useGetUserQuery();
// AuthHydrator component calls useGetUserQuery() on mount, which hits the API to check if the user's session cookie is still valid. If it is, it dispatches setCredentials to repopulate the auth store.
// Hydrator repopulates auth store upon refresh if cookis is still valid. 
// rep and co have no equivalent hydration mechanism — nothing re-fetches them on reload.

  useEffect(() => {
    if (user) dispatch(setCredentials({ user }));
  }, [user, dispatch]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthHydrator />
        {children}
      </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}