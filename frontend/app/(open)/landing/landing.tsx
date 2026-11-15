//responsive: Ensure images use width: '100%' with maxHeight and objectFit to fill their grid cell.
//MUI
import {Box, Button, Card, CardMedia, CardContent, CardActions, Container, Divider, Grid, Paper, Stack, Typography} from '@mui/material';
//NEXT
import Image from 'next/image';

import collage from './assets/landing2/landing2Collage.png';
import orbit from './assets/landing/space.png';
import announce from './assets/landing/cardAnnounce.png';
import invite from './assets/landing/cardInvite.png';
import saveDate from './assets/landing/cardSaveDate.png';
import mailbox from './assets/landing/mailbox.png';

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
<Box sx={{backgroundColor:'#d8a790',m:0, p:0}}>
  <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth:'xl', mx: 'auto', pb:5, pt:10}}> 
    {/* mx: 'auto' is what centers the Grid itself within the parent when it has a constrained maxWidth. */}

      <Grid size={{xs:0, sm:4}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Image src={collage} alt="collage graphic" style={{ width:'80%', maxHeight: 410, objectFit: 'contain' }}/>
      </Grid>

{/* col2 */}
    <Grid size = {{xs:12, sm:8}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center',  objectFit: 'contain', pl:1}}> 
    <Stack direction='column' sx={{width:'100%', display:"flex", alignItems: 'center', justifyContent: 'center', mr:5}}>

      <Stack direction='row' sx={{width:'100%', display:"flex", alignItems: 'center', justifyContent: 'center', borderTop: '2px solid #c7c7c7', borderBottom: '2px solid #c7c7c7', p: 3, ml:3}}>
        <Card sx={{ml:3, mr:1}}>
          <CardContent>
          <Image src={announce} alt="Wedding Announcement Card" style={{width: '100%', objectFit: 'contain', border: '1px solid #c7c7c7', borderRadius: '15px', }} />
          </CardContent>
          <Typography textAlign='center' sx={{fontSize:{xs:14, sm:16}}}>Announcement</Typography>
        </Card>
        
        <Card sx={{mx:1}}>
          <CardContent>
          <Image src={saveDate} alt="Save the Date Card" style={{width: '100%', objectFit: 'contain', border: '1px solid #c7c7c7', borderRadius: '15px', }} />
          </CardContent>
          <Typography textAlign='center' sx={{fontSize:{xs:16, sm:18}}}>Save the Date</Typography>
        </Card>

        <Card sx={{mx:1}}>
          <CardContent>
          <Image src={invite} alt="Wedding Invite Card" style={{width: '100%', objectFit: 'contain', border: '1px solid #c7c7c7', borderRadius: '15px', }} />
          </CardContent>
          <Typography textAlign='center' sx={{fontSize:{xs:14, sm:16}}}>Invitation</Typography>
        </Card>
        
        <Card sx={{mx:1}}>
          <CardContent>
          <Image src={mailbox} alt="photo of mailbox" style={{width: '100%', objectFit: 'cover', border: '1px solid #c7c7c7', borderRadius: '15px' }} />
          </CardContent>
          <Typography textAlign='center' sx={{fontSize:{xs:16, sm:18}}}>Joy of Mail</Typography>
        </Card>

        </Stack>
        <Typography textAlign='center' sx={{fontSize:{xs:24, sm:30}, color:'white', mt:6}}>Printed, addressed, and mailed for  <span style={{color:'blue'}}>$0</span></Typography>
      </Stack>

    </Grid>
  {/* end Grid container */}
  </Grid>
{/* end Box background color */}
</Box>

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


