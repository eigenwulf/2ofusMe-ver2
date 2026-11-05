//responsive: Ensure images use width: '100%' with maxHeight and objectFit to fill their grid cell.
//MUI
import {Box, Button, Card, CardMedia, CardContent, CardActions, Container, Divider, Grid, Paper, Stack, Typography} from '@mui/material';
//NEXT
import Image from 'next/image';

import cardData from '@/public/card-stock/data/cardData.json'
import collage from './assets/landing2/landing2Collage.png';
import orbit from './assets/landing/space.png';
import flowchart from './assets/landing/landing_flowchart.png';
import paper from './assets/landing/light marine gradient watercolor_scaled.png';
import mediterranean from '@/public/card-stock/examples/Mediterranean-Invitation.png'
import { relative } from 'path';

export default function Landing() {
	
	return (

  <Container maxWidth={false} disableGutters sx={{backgroundColor:'#d8a790', m:0, p:0}} >

{/* ROW 1_____________________________________________________________________________________________________________________ */}
  {/* <Box sx={{ position: "relative", '& img': {opacity: { xs: 0.5, sm: 0.9, md:1 } } }}>  */}
  {/* & refers to the current element (the Box) & img means "any <img> element that is a descendant of this Box" */}

    {/* <Image src={orbit} alt="astronauts just married" style={{ width: '100%', maxHeight: 550, objectFit: 'cover' }}/>
    <Typography sx={{ position: "absolute", top: 90, left: {xs:100, sm:150}, fontFamily: 'var(--font-montserrat)', fontSize: {xs:'16pt', sm:'18pt'}, color: '#ffffff', fontWeight: '450', letterSpacing: 1, lineHeight: 1.2, textAlign: 'left'}}>
      Launch your wedding
    <Typography sx={{ fontFamily: 'var(--font-montserrat)', fontSize: '14pt', color: '#ffffff', letterSpacing:1, fontWeight: '450', lineHeight: 1.2, textAlign: 'left', pt: 2, pb:5 }} > 
        with real paper invitations and cards, <br/>
        printed and mailed for <strong>free</strong>
    </Typography></Typography>
  </Box>  */}


{/* ROW 2_____________________________________________________________________________________________________________________ */}

<Box sx={{ position: "relative", '& img': {opacity: { xs: 0.5, sm: 0.9, md:1 } } }}> 
  {/* & refers to the current element (the Box) & img means "any <img> element that is a descendant of this Box" */}
  <Image src={paper} alt="astronauts just married" style={{ width: '100%', objectFit: 'fill' }}/>

  <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt:2, mb:12, 
    position:'absolute', 
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '70%'}}> 

{/* col1 */}
    <Grid size={{xs:6}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Image src={collage} alt="collage" style={{ width:'70%', objectFit: 'cover' }}/>
    </Grid> 
    {/* </Grid> */}

{/* col2 */}
    <Grid size={{xs:6}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

      <Stack sx={{width:'100%'}}>

        <Typography textAlign='center' sx={{ fontSize: {xs:'16pt', sm:'25pt'}, color: 'contrastText', fontWeight: '450', letterSpacing:1, lineHeight: 1.2, textAlign: 'center', pt:0, mb:3 }} >
          One less expense for happily ever after  
        </Typography>

        <Image src={flowchart} alt="how it works flowchart" style={{ width: '100%', maxHeight: 600, objectFit: 'cover' }}/>

        <Button variant="outlined"  size= 'medium' sx={{ color: 'black',width:'fit-content', height:'fit-content', fontWeight: 400, border:1, boxShadow: '0 0 0 3px lightblue', m:4}}>
          More
        </Button>
      </Stack>
    </Grid>



{/* end Grid container Row2 */}
  </Grid>
</Box>





{/* end Stack Row2 */}
  {/* </Stack> */}


</Container>
	);

}
/* &::before is a CSS pseudo-element, written in the nested selector syntax that MUI's
& — refers to the current element (the Box span itself). It's a placeholder for "self".
::before — a CSS pseudo-element that inserts a virtual child element before the element's content. It only renders if you give it content: '""'.
So '&::before': { ... } means: "on this element, style its ::before pseudo-element".
pseudo-element is completely separate from the text flow.
*/


