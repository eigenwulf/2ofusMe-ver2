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

<Box sx={{backgroundColor:'#d8a790',m:0, p:0}}>


{/* version 2_____________________________________________________________________________________________________________________ */}
{/* col1 */}
    <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth:'xl', mx: 'auto', pb:5}}> 
      {/* mx: 'auto' is what centers the Grid itself within the parent when it has a constrained maxWidth. */}
      <Grid size={{xs:12, sm:6}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt:5}}>

        <Stack direction='column'>

          <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth:'xl', mx: 'auto', pb:0}}> 

              <Grid size ={{xs:4}}>
                  <Typography textAlign='center' sx={{ fontSize: '26pt', fontWeight: '450', color: 'white', letterSpacing:1, lineHeight: 1.2, textAlign: 'center', pt: 5, }} >
                    One Less Expense for Happily Ever After
                  </Typography>        
              </Grid>
              
              <Grid size ={{xs:8}}>
                  <Image src={collage} alt="collage graphic" style={{ width:'80%', maxHeight: 350, objectFit: 'contain' }}/>
              </Grid>
        {/* end grid container */}
          </Grid>

          <Typography textAlign='left' sx={{fontSize:{xs:20, sm:35}, pt:3, color:'black' }}>Beautiful wedding invitations</Typography>
          <Typography textAlign='left' sx={{fontSize:{xs:18, sm:35}, color:'black'}}>Printed, addressed, and mailed for  <span style={{color:'white'}}>$0</span></Typography>
        </Stack>
    </Grid>


{/* col2 */}
<Grid size = {{xs:12, sm:6}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center', position: 'relative'}}> 

  <Image src={paper} alt="paper texture" style={{ width: '100%', height:'100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}/>
  <Image src={howflow2} alt="how it works flow diagram" style={{ width: '80%', height:'auto', objectFit: 'cover', border: '1px solid #c7c7c7', borderRadius: '15px', padding:'1px', position: 'relative', zIndex: 1 }} />

</Grid>


  </Grid>
{/* end Grid container */}
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


