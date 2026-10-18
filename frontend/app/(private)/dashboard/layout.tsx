
import type { Metadata } from "next";
import { Box, Grid, Stack, Typography} from '@mui/material';

import AppbarSignedVert from "../../__components/Appbar/appbar_signed_vertical";

export default function Layout({children} 
  : {children: React.ReactNode} ) {

  return (
    <>
<Grid container>
  <Grid size={{xs:2, md:1}}>
    <AppbarSignedVert />  
    {/* <Box component="main" sx={{  minHeight: '100vh', backgroundColor: 'lightblue' }}> */}
  </Grid>

  <Grid size={{xs:10, md:11}}>
    <Box component="main" sx={{  minHeight: '100vh' }}>
      {children}
    </Box>
  </Grid>

</Grid>
    </>
  );
}


