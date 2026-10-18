import { Box } from '@mui/material';

import Appbar_Landing from '../../__components/Appbar/appbar-landing'

export default function Layout({children} 
  : {children: React.ReactNode} ) {

  return (
      <>
        <Appbar_Landing  />
            {children}

      </>
  );
}
