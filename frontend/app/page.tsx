import {Container, Box, Grid, Typography} from '@mui/material';

import Landing from './(open)/landing/landing'
import Landingpt2 from './(open)/landing/landingpt2'
import CardGallery from './(open)/landing/cardgallery'
import Appbar_Landing from './__components/Appbar/appbar-landing'

export default function Home () {
  return (
    <div className="App">
      <Container maxWidth={false} disableGutters sx={{px:0, mx:0}}>

        {/* <Box sx={{ position: "relative", zIndex: 1 }}> */}
        <Appbar_Landing />     
        <Landing />
        {/* <Landingpt2 /> */}
        <div id="card-gallery">
          <CardGallery />
        </div>
        
        <footer style={{
            backgroundColor: "lightblue",
            padding:"1rem"
          }}> Footer Here
        </footer>
      </Container>
    </div> 
    );  
  }
