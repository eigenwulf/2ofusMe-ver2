//responsive: Ensure images use width: '100%' with maxHeight and objectFit to fill their grid cell.
//MUI
import {Box, Button, Card, CardMedia, CardContent, CardActions, Container, Divider, Grid, Paper, Stack, Typography} from '@mui/material';
//NEXT
import Image from 'next/image';

import ContactInitial from '../../__components/contactform/contactinitial'

import nepal from './assets/nepal.png';
import nepalEnvelope from './assets/nepalEnvelope.png';
import meinOffice from './assets/meinOffice.png';
import board from './assets/board.png';

export default function About() {
	
	return (

	<Container maxWidth={false} disableGutters sx={{width:'100%', px:0, mx:0}} >
    {/* remove gutters to spread background color across width */}

{/* ROW 1_____________________________________________________________________________________________________________________ */}

<Box sx={{backgroundColor:'#a9c1d776', display:'flex', justifyContent:'center'}} >

<Grid container sx={{ display:'flex', justifyContent:'center', maxWidth:'1250px', pt:2, px:1, mx:1}} >  
{/* maxWidth needed for each row as container needs to be 100% to allow background color in rows */}

    <Typography sx={{ fontSize: { xs: '20', sm:'24pt' }, fontWeight: '500', letterSpacing:1, textAlign: {sm: 'left', md:'center' }, mt:3, mb:4}} >
    Homage to Mail
    </Typography>

{/* ROW 1_____________________________________________________________________________________________________________________ */}
    <Grid container size={{xs:12 }} sx={{mt:4, mb:4}}>
      {/* col 1 */}
      <Grid size={{xs:12, sm:6}} sx={{display:'flex', alignContent:'center', justifyContent:'center'}}>
        <Box sx={{width: '90%', maxWidth:'570px'}}>

          <Typography sx={{ fontSize: { xs: '16', sm:'18pt' }, mb:4 }}>
          When I was Peace Corps volunteer in Nepal some time ago, letters and cards were my connection to home. 
          </Typography>
          <Box sx={{display:'flex', alignContent:'center', justifyContent:'center', ml:-5}}>
            <Image src={nepalEnvelope} alt="letter" style={{ maxWidth: '50%', objectFit: 'contain',  borderRadius: '15px' }}/>
          </Box>
        </Box>
      </Grid>

      {/* col 2 */}
      <Grid size={{xs:12, sm:6}} sx={{mb: 3}}>
        <Image src={nepal} alt="scenery in Nepal" style={{ maxWidth: '80%', objectFit: 'contain',  borderRadius: '15px' }}/>
      </Grid>
    
      <Grid size={{xs:1}}></Grid>
      
    </Grid>

  </Grid>
{/*end Grid Container_________________________________________________________  */}
</Box>
{/* end box for background color */}

{/* ROW 2_____________________________________________________________________________________________________________________ */}
<Box sx={{ display:'flex', justifyContent:'center'}} >
  <Grid container sx={{display:'flex', alignItems:'center', justifyContent:'flex-start', maxWidth:'1250px', mt:9, mb:5, px:1, mx:1}} >  					

  {/* COLUMN 1 ___________________________________*/}
    <Grid size = {{xs: 5}} sx={{display:"flex", alignItems: 'center', justifyContent: 'center'}}>

      <Box sx={{ display:'flex', alignContent:'flex-start', width:'90%', objectFit: 'contain', pl:2}}>
        <Stack direction='column'>
        <Typography  sx={{ fontSize: { xs: '20', sm:'24pt' },textAlign: 'center', mb:6}}>Lasting memories</Typography>
        <Typography  sx={{ fontSize: { xs: '16', sm:'18pt' },textAlign: 'left'}}>
          I still have those letters and cards. Our mission is to bring people together to create lasting memories.
        </Typography>
</Stack>
      </Box>			
    </Grid>

  {/* COLUMN 2 ___________________________________*/}
    <Grid size = {{xs: 7}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center', pl:8}}> 

      <Image src={meinOffice} alt="" style={{ maxHeight: '450px', width: '100%', objectFit: 'contain' }} />

{/* next/image with a static import renders at its intrinsic width by default — it doesn't auto-expand to fill the parent. Adding width: '100%' overrides that, making it stretch to the full Grid column. */}
    </Grid>
	
{/* divider */}
<Grid size={11} sx={{border:1, borderColor:'lightgray', mt: 9}}></Grid>
	
  </Grid> 
{/* end grid container */}
</Box>
{/*End Row_________________________________________________________  */}

{/* ROW 3_____________________________________________________________________________________________________________________ */}


<Box sx={{ display:'flex', justifyContent:'center'}} >
  <Grid container sx={{display:'flex', alignItems:'center', justifyContent:'center', maxWidth:'xl', mt:1, px:1, mx:1}} >  					

    <Grid size={{xs:12}}>
        <Typography  sx={{ fontSize: { xs: '20', sm:'24pt' },textAlign: 'center', mb:5}}>
          Togetherness
        </Typography>
    </Grid>
{/* COLUMN 2 ___________________________________*/}
			<Grid size = {{xs:12, md: 4}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center', paddingLeft:1 }}> 

		<Box sx={{width:'100%'}}>

        <Typography  sx={{ fontSize: { xs: '16', sm:'18pt' },textAlign: 'left', pl:5}}>
            In our digital age, tangible things bring us together to celebrate life. 
        </Typography>

				</Box>		

			</Grid>

{/* COLUMN 3 ___________________________________*/}
			<Grid size = {{xs:0, md: 7}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center', mt:3 }}>
          <Image src={board} alt="" style={{ width: '80%', maxHeight: '500px',objectFit: 'contain', marginBottom:'50px' }} 
            // width: auto prevents Image from taking up whole box, so that justifyContent works
          />
			</Grid>
      <Grid size={{xs:1 }}></Grid>

  </Grid> 
</Box>
{/*End Row3_________________________________________________________  */}

  <Divider />

  <Box sx={{backgroundColor:'#f7eadbd7', display:'flex', justifyContent:'center'}} >			
  <ContactInitial />
  </Box>

</Container>

	);
}