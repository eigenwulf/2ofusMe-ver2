//responsive: Ensure images use width: '100%' with maxHeight and objectFit to fill their grid cell.
//MUI
import {Box, Button, Card, CardMedia, CardContent, CardActions, Container, Divider, Grid, Paper, Stack, Typography} from '@mui/material';
//NEXT
import Image from 'next/image';

import cardData from '@/public/card-stock/data/cardData.json'
import collage from './assets/landing2/landing2Collage.png';
import orbit from './assets/landing/space.png';
import flowchart from './assets/landing/landing_flowchart.png';
import howflow from './assets/landing/howflow.png';
import howflow2 from './assets/landing/how_flow2.png';
import paper from './assets/landing/light marine gradient watercolor_scaled.png';
import mediterranean from '@/public/card-stock/examples/Mediterranean-Invitation.png'
import { relative } from 'path';

export default function Landing() {
	
	return (

  <Container maxWidth={false} disableGutters sx={{backgroundColor:'#d8a790', m:0, p:0}} >

{/* <Box sx={{backgroundColor:'#d8a790',m:0, p:0}}> */}
<Box sx={{backgroundColor:'#faf9f6',m:0, p:0}}>
  

{/* version 0_____________________________________________________________________________________________________________________ */}

  <Typography textAlign='center' sx={{ fontSize:{xs:0, sm:0, md:28}, fontWeight: '450', color: 'black', letterSpacing:1, lineHeight: 1.2, textAlign: 'center', pt: 5, }} >
    One Less Expense for Happily Ever After
  </Typography>
  <Typography textAlign='center' sx={{ fontSize:{xs:24}, fontWeight: '450', color: 'black', letterSpacing:1, lineHeight: 1.2, textAlign: 'center', pt: 2, pb:3}} >
    Wedding invitations sponsored by hand-picked brands your guests will love
  </Typography>

{/* col1 */}
  <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth:'xl', mx: 'auto', pb:5}}> 
    {/* mx: 'auto' is what centers the Grid itself within the parent when it has a constrained maxWidth. */}

      <Grid size={{xs:0, sm:4}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Image src={collage} alt="collage graphic" style={{ width:'80%', maxHeight: 410, objectFit: 'contain' }}/>
      </Grid>

{/* col2 */}
    <Grid size = {{xs:12, sm:8}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center',  objectFit: 'contain', pl:1}}> 
      <Stack direction='row' sx={{width:'100%', display:"flex", alignItems: 'center', justifyContent: 'center', mr:5, pl:-5}}>

        <Image src={howflow2} alt="how it works flow diagram" style={{  maxHeight: 350, width: '80%', objectFit: 'contain', border: '1px solid #c7c7c7', borderRadius: '15px', padding:'9px' }} />
        <Typography textAlign='center' sx={{fontSize:{xs:24, sm:30}, color:'white', mt:6}}>Printed, addressed, and mailed for  <span style={{color:'black'}}>$0</span></Typography>
      </Stack>
    </Grid>
  {/* end Grid container */}
  </Grid>
  </Box>



</Container>
	);

}
/* &::before is a CSS pseudo-element, written in the nested selector syntax that MUI's
& — refers to the current element (the Box span itself). It's a placeholder for "self".
::before — a CSS pseudo-element that inserts a virtual child element before the element's content. It only renders if you give it content: '""'.
So '&::before': { ... } means: "on this element, style its ::before pseudo-element".
pseudo-element is completely separate from the text flow.

Button example
        <Button variant="outlined"  size= 'medium' sx={{ color: 'black',width:'fit-content', height:'fit-content', fontWeight: 400, border:1, boxShadow: '0 0 0 3px lightblue', m:4}}>
          More
        </Button>

*/


