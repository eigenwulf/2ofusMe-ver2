//responsive: Ensure images use width: '100%' with maxHeight and objectFit to fill their grid cell.
//MUI
import {Box, Button, Card, CardMedia, CardContent, CardActions, Container, Divider, Grid, Paper, Stack, Typography} from '@mui/material';
//NEXT
import Image from 'next/image';

import collage from './assets/landing/landingCollage.png';
import orbitLanding from './assets/landing/orbitLanding.png';
import announce from './assets/landing/cardAnnounce.png';
import invite from './assets/landing/cardInvite.png';
import saveDate from './assets/landing/cardSaveDate.png';
import mailbox from './assets/landing/mailbox.png';
import brand1 from './assets/landing/brand1.png';
import brand2 from './assets/landing/brand2.png';
import brand3 from './assets/landing/brand3.png';
import brand4 from './assets/landing/coffeeBrand.png';
import brand5 from './assets/landing/eduBrand.png';
import brand6 from './assets/landing/genericBrand.png';


import { relative } from 'path';

export default function Landing() {
return (

<Container maxWidth={false} disableGutters sx={{backgroundColor:'#d8a790', m:0, p:0}} >
<Box sx={{backgroundColor:'#faf9f6',m:0, p:0}}>
  
{/* version 0_____________________________________________________________________________________________________________________ */}

  <Typography textAlign='center' sx={{ fontSize:{xs:0, sm:0, md:32}, fontWeight: '450', color: 'black', letterSpacing:1, lineHeight: 1.2, textAlign: 'center', pt: {xs:2,sm:3, md:7}, pb: {xs:2, sm:2} }}>
    One Less Expense for Happily Ever After
  </Typography>
  <Typography textAlign='center' sx={{ fontSize:{xs:24, sm:26}, fontWeight: '450', color: 'black', letterSpacing:1, lineHeight: 1.2, textAlign: 'center', pt: 2, pb:3}} >
    <span style={{color:'#0779b2'}}>FREE</span> wedding invitation service sponsored by hand-picked brands
  </Typography>

{/* row 1 */}
<Box sx={{backgroundColor:'#d8a790',m:0, p:0}}>
  <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth:'xl', mx: 'auto', pb:5, pt:10}}> 
    {/* mx: 'auto' is what centers the Grid itself within the parent when it has a constrained maxWidth. */}

{/* col1 collage*/}
      <Grid size={{xs:0, sm:2, md:3}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Box sx={{border: '2px solid #8899a0'}}>
          <Image src={collage} alt="collage graphic" style={{ width:'100%', maxHeight: 300, objectFit: 'contain' }}/>
        </Box>
      </Grid>

{/* col2 cards */}
    <Grid size = {{xs:12, sm:6}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center',  objectFit: 'contain', pl:1}}> 
    <Stack direction='column' sx={{width:'100%', display:"flex", alignItems: 'center', justifyContent: 'center', mr:5}}>

      <Stack direction='row' sx={{width:'100%', display:"flex", alignItems: 'center', justifyContent: 'center', borderTop: '2px solid #c7c7c7', borderBottom: '2px solid #c7c7c7', p: 3, ml:3}}>
        <Card sx={{ml:3, mr:1}}>
          <CardContent>
          <Image src={announce} alt="Wedding Announcement Card" style={{width: '100%', objectFit: 'contain', border: '1px solid #c7c7c7', borderRadius: '15px', }} />
          </CardContent>
          <Typography textAlign='center' sx={{fontSize:{xs:12, md:16}}}>Announcement</Typography>
        </Card>
        
        <Card sx={{mx:1}}>
          <CardContent>
          <Image src={saveDate} alt="Save the Date Card" style={{width: '100%', objectFit: 'contain', border: '1px solid #c7c7c7', borderRadius: '15px', }} />
          </CardContent>
          <Typography textAlign='center' sx={{fontSize:{xs:12, md:16}}}>Save the Date</Typography>
        </Card>

        <Card sx={{mx:1}}>
          <CardContent>
          <Image src={invite} alt="Wedding Invite Card" style={{width: '100%', objectFit: 'contain', border: '1px solid #c7c7c7', borderRadius: '15px', }} />
          </CardContent>
          <Typography textAlign='center' sx={{fontSize:{xs:12, md:16}}}>Invitation</Typography>
        </Card>
        
        <Card sx={{ display: {xs:'none', sm: 'none', md: 'block'}, mx: 1 }}>
          <CardContent>
          <Image src={saveDate} alt="Save the Date Card" style={{width: '100%', objectFit: 'contain', border: '1px solid #c7c7c7', borderRadius: '15px', }} />
          </CardContent>
          <Typography textAlign='center' sx={{fontSize:{xs:12, md:16}}}>RSVP</Typography>
        </Card>

        </Stack>
          <Typography textAlign='center' sx={{fontSize:{xs:26, sm:34, md:38}, color:'white', mt:6, letterSpacing:1, lineHeight: 1}}>
            Printed, addressed, and mailed for  <span style={{color:'#0779b2'}}>$0</span>
          </Typography>
          
          <Button variant="outlined"  size= 'medium' sx={{ color: 'black',width:'fit-content', height:'fit-content', fontWeight: 400, border:1, boxShadow: '0 0 0 3px lightblue', m:4}}>
            Start Designing
          </Button>
      </Stack>

    </Grid>

{/* col 3 mailbox */}
      <Grid size={{xs:0, sm:2, md:3}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Box sx={{border: '2px solid #8899a0'}}>
          <Image src={mailbox} alt="image of mailboxs" style={{ width:'100%', maxHeight: 300, objectFit: 'cover' }}/>
        </Box>
      </Grid>

  {/* end Grid container */}
  </Grid>
{/* end Box pink background color */}
</Box>

{/* row 2 SPONSORS scrollbar___________________________________________________________________________________________*/}
<Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth:'xl', mx: 'auto', pt:4, pb:5}}>

{/* col 1 */}

  <Grid size = {{xs:12, sm:2}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'flex-end',  pl:1, border:0}}> 
    <Typography textAlign='left' sx={{fontSize:{xs:16, sm:22, md:22}, color:'', }}>
      Made possible by sponsors your guests will love
    </Typography>
  </Grid>

  <Grid size = {{xs:12, sm:8}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center',  border:0}}> 
  <Stack direction='row' sx={{width:'100%', display:"flex", alignItems: 'center', justifyContent: 'center', p: 3, ml:3}}>
    
    <Box sx={{mr:1, width:100}}>
      <Image src={brand1} alt="Wedding Announcement Card" style={{objectFit: 'contain',  }} />
    </Box>
    <Box sx={{mr:1, width:100}}>
      <Image src={brand2} alt="Wedding Announcement Card" style={{ objectFit: 'contain',  }} />
    </Box>
    <Box sx={{mr:1, width:100}}>
      <Image src={brand3} alt="Wedding Announcement Card" style={{objectFit: 'contain', }} />
    </Box>
    <Box sx={{mr:1, width:100}}>
      <Image src={brand4} alt="Wedding Announcement Card" style={{ objectFit: 'contain', }} />
    </Box>
    <Box sx={{mr:1,  width:100}}>
      <Image src={brand5} alt="Wedding Announcement Card" style={{ objectFit: 'contain', }} />
    </Box>
    <Box sx={{mr:1, width:100}}>
      <Image src={brand6} alt="Wedding Announcement Card" style={{objectFit: 'contain',  }} />
    </Box>
        <Box sx={{mr:1, width:100}}>
      <Image src={brand1} alt="Wedding Announcement Card" style={{objectFit: 'contain',  }} />
    </Box>

  </Stack>

{/* end col 1 */}
  </Grid>

  {/* <Grid size = {{xs:0, sm:3}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center'}}> 
    <Image src={orbitLanding} alt="image of couple in orbit" style={{ width:'90%', maxHeight: 200, objectFit: 'cover', marginTop: 20 }}/>
  </Grid> */}


{/* end row 2 grid container */}
</Grid>

{/* end white background color */}
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


