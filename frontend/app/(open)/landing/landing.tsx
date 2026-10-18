//responsive: Ensure images use width: '100%' with maxHeight and objectFit to fill their grid cell.
//MUI
import {Box, Button, Card, CardMedia, CardContent, CardActions, Container, Divider, Grid, Paper, Stack, Typography} from '@mui/material';
//NEXT
import Image from 'next/image';

import cardData from '@/public/card-stock/data/cardData.json'
import collage from './assets/landing2/landing2Collage.png';
import orbit from './assets/10jul2026Orbit.png';
import mediterranean from '@/public/card-stock/examples/Mediterranean-Invitation.png'

export default function Landing() {
	
	return (

  <Container maxWidth={false} disableGutters sx={{backgroundColor:'#d8a790', m:0, p:0}} >

{/* ROW 1_____________________________________________________________________________________________________________________ */}
  <Box sx={{ position: "relative", '& img': {opacity: { xs: 0.5, sm: 0.9, md:1 } } }}> 
  {/* & refers to the current element (the Box) & img means "any <img> element that is a descendant of this Box" */}

    <Image src={orbit} alt="astronauts just married" style={{ width: '100%', maxHeight: 550, objectFit: 'cover' }}/>
    <Typography sx={{ position: "absolute", top: 90, left: {xs:100, sm:150}, fontFamily: 'var(--font-montserrat)', fontSize: {xs:'16pt', sm:'18pt'}, color: '#ffffff', fontWeight: '450', letterSpacing: 1, lineHeight: 1.2, textAlign: 'left'}}>
      Launch your wedding
    <Typography sx={{ fontFamily: 'var(--font-montserrat)', fontSize: '14pt', color: '#ffffff', letterSpacing:1, fontWeight: '450', lineHeight: 1.2, textAlign: 'left', pt: 2, pb:5 }} > 
        with real paper invitations and cards, <br/>
        printed and mailed for <strong>free</strong>
    </Typography></Typography>
  </Box>

    <Stack sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    
    <Grid container sx={{maxWidth:'1250px', display: 'flex', alignItems: 'center', justifyContent: 'center', width:'100%', mt:5, mb:5}}> 

    <Typography textAlign='center' 
    sx={{ fontSize: {xs:'16pt', sm:'18pt'}, color: 'white', fontWeight: '450', letterSpacing:1, lineHeight: 1.2, textAlign: 'center', pt:0, mb:3 }} >
      The Romance of Paper Wedding Invitations <br/>    
        <Typography textAlign='center' sx={{ fontSize: {xs:'16pt', sm:'18pt'}, color: '#5f646e', fontWeight: '550', letterSpacing:1, lineHeight: 1.2, textAlign: 'center', pt:0, mb:3 }} >
          at no cost to you    
        </Typography>
    </Typography>

{/* col1 */}
  <Grid container sx={{maxWidth:'1250px', display: 'flex', alignItems: 'center', justifyContent: 'center', width:'100%'}}> 
    <Grid size={{xs:7}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Image src={collage} alt="collage graphic" style={{ width:'80%', objectFit: 'cover' }}/>
    </Grid>

{/* col2 */}
    <Grid size={{xs:5}}>
        <Typography textAlign='left' sx={{ fontSize: '20pt', color: '#000000', fontFamily: 'Spectral', fontWeight: 500, ml:3, mt:5, mb: 5}} >
          Choose your style
        </Typography>
    <Grid container>
      <Grid size={{xs:6, sm:4, md:3}} sx={{ px:1}}>
        <Image alt='' src={mediterranean}/>
      </Grid>

      <Grid size={{xs:6, sm:4, md:3}} sx={{ px:1}}>
        <Image alt='' src={mediterranean}/>
      </Grid>

      <Grid size={{xs:6, sm:4, md:3}} sx={{ px:1}}>
        <Image alt='' src={mediterranean}/>
      </Grid>
    </Grid>

        <Button variant="outlined"  size= 'medium' sx={{ color: 'black',width:'fit-content', height:'fit-content', fontWeight: 400, border:1, boxShadow: '0 0 0 3px lightblue', m:4}}>
          More
        </Button>

    </Grid>
{/* end Grid container */}
  </Grid >

{/* end Grid container */}
  </Grid>
  </Stack>
</Container>
	);

}
/* &::before is a CSS pseudo-element, written in the nested selector syntax that MUI's
& — refers to the current element (the Box span itself). It's a placeholder for "self".
::before — a CSS pseudo-element that inserts a virtual child element before the element's content. It only renders if you give it content: '""'.
So '&::before': { ... } means: "on this element, style its ::before pseudo-element".
pseudo-element is completely separate from the text flow.
*/


