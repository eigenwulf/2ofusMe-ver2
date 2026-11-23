//responsive: Ensure images use width: '100%' with maxHeight and objectFit to fill their grid cell.
//MUI
import {Box, Button, Card, CardMedia, CardContent, CardActions, Container, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography} from '@mui/material';
import {Inbox, Drafts, Redeem, Laptop, RoomService } from '@mui/icons-material';
//NEXT
import Image from 'next/image';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';

import ContactInitial from './contactinitial'
import howitworksFlow from './assets/howitworksflow.webp';
import collage from './assets/lifestyleCollage.webp';
import miniInvites from './assets/miniInvites.webp';
import miniBrands from './assets/miniBrands.webp';
import greenMailbox from './assets/greenMailbox.png';
import miniTools from './assets/miniTools.webp';

import coupons from './assets/iStockCoupons.jpg';
import justMarriedCar from './assets/iStockjustmarriedCar.jpg';

type Step = {
    order: string,
    heading: string,
		description: string,
	}

const Tools:Step [] = [
  {
    order: '01',
    heading:'Confirmation of mailing',
		description: 'We let you know when the invites are mailed',
  },
  {
    order: '02',
    heading:'RSVP online',
		description: 'Invitees can RSVP to you with the link we provide',
  },
  {
    order: '03',
    heading:'E-card version',
		description: 'A digital e-card is also provided to send electronically',
  },
  {
    order: '04',
    heading:'Gift registry',
		description: 'You can provide a link to your gift registry',
  },

]

export default function Landing() {
return (
<Container maxWidth={false} disableGutters sx={{ m:0, p:0}} >

{/* ROW 1_____________________________________________________________________________________________________________________ */}
  <Box sx={{backgroundColor:'#eab66c',m:0, p:0}}>
    {/* <Box sx={{backgroundColor:'#ffc29e',m:0, p:0}}> */}

    <Typography textAlign='center' sx={{ fontFamily: 'var(--font-montserrat)', fontSize: '26pt', fontWeight: '550', color: '',  textAlign: 'center', pt: 8, }} >
      Sending beautiful paper<br/>wedding invitations for free
    </Typography>
    <Typography textAlign='center' sx={{ fontSize: '20pt', fontWeight: '450', color: '', letterSpacing:1, lineHeight: 1.2, textAlign: 'center', pt: 2, pb:6}} >
      Made possible by hand-picked sponsor ads your guests will love
    </Typography>

{/* ROW 2 collage_____________________________________________________________________________________________________________________ */}

{/* col1 */}
    <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', pb:5}}> 
      {/* mx: 'auto' is what centers the Grid itself within the parent when it has a constrained maxWidth. */}

      <Grid size={{xs:7}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth:'xl', pb:5}}>
        <Box sx={{backgroundColor:'#c7c1d8', p:6, }}>
          <Image src={collage} alt="collage graphic" style={{objectFit: 'contain', maxHeight:450}}/>
        </Box>
      </Grid>
    {/* end row 2 grid container */}
    </Grid>
  {/* end row 1 and row 2 Box for background */}
  </Box>

{/* ROW 3 how works flow graphic_____________________________________________________________________________________________________________________ */}

{/* col2 */}
  <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth:'xl', mx: 'auto', backgroundColor:'#faf9f6',pt: 5, pb:5}}> 
    <Grid size = {{xs:7,}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center',  objectFit: 'contain'}}> 
      <Image src={howitworksFlow} alt="how it works flow diagram" style={{  height: '100%', objectFit: 'contain' }} />
    </Grid>

    <Grid size = {{xs:7,}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center',  objectFit: 'contain', pl:1}}> 
      <Stack direction='column'>

      <Typography textAlign='center' sx={{fontSize:{xs:20, sm:26}, pt:3,}}>You personalize online, we print and mail for free</Typography>
      <Typography textAlign='left' sx={{fontSize:{xs:18, sm:22},}}>Design online, add your guest list, sponsor ads are matched and attached. 
Then we handle the printing, postage, and delivery all for free. 
Plus, free digital tools.</Typography>
      </Stack>
    </Grid>
{/* end Grid container row 2*/}  
  </Grid>
  
{/* ROW 3 how it works descriptive boxes____________________________________________________________________________________________________________ */}

  <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth:'xl', mx: 'auto',}}> 

{/* col1 */}

  <Stack direction='row' sx={{width:'100%', display:"flex", alignItems: 'flex-start', justifyContent: 'center', borderTop: '2px solid #c7c7c7', borderBottom: '2px solid #c7c7c7', p: 3,}}>

<Stack sx={{backgroundColor:'#e0e9f4', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
  <Box>
            <Image src={miniInvites} alt="Wedding Announcement Card" style={{ objectFit: 'contain', height: '225px',border: '1px solid #c7c7c7', borderRadius: '15px', }} />
  </Box>
    <Typography textAlign='left' sx={{fontSize:{xs:16, md:20}, fontWeight:500}}>1. Design</Typography>
        <Typography textAlign='left' sx={{fontSize:{xs:16, md:20}}}>Choose design and write details</Typography>
</Stack>

    <Card sx={{p:4, ml:3, mr:1}}>
<CardContent sx={{backgroundColor:'#e0e9f4', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Image src={miniInvites} alt="Wedding Announcement Card" style={{ objectFit: 'contain', height: '225px',border: '1px solid #c7c7c7', borderRadius: '15px', }} />
      </CardContent>
      <CardContent>
        <Typography textAlign='left' sx={{fontSize:{xs:16, md:20}, fontWeight:500}}>1. Design</Typography>
        <Typography textAlign='left' sx={{fontSize:{xs:16, md:20}}}>Choose design and write details</Typography>
      </CardContent>
    </Card>
    
    <Card sx={{ p:4, ml:3, mr:1}}>
<CardContent sx={{backgroundColor:'#e0e9f4', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Image src={miniBrands} alt="Save the Date Card" style={{ objectFit: 'contain', height: '225px',border: '1px solid #c7c7c7', borderRadius: '15px', }} />
      </CardContent>
      <CardContent>
        <Typography textAlign='left' sx={{fontSize:{xs:16, md:20}, fontWeight:500}}>2. Match</Typography>
        <Typography textAlign='left' sx={{fontSize:{xs:16, md:20}}}>Inserts will accompany invitations bearing special deals</Typography>
      </CardContent>
    </Card>

    <Card sx={{p:4, ml:3, mr:1}}>
<CardContent sx={{backgroundColor:'#e0e9f4', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Image src={greenMailbox} alt="Wedding Announcement Card" style={{ objectFit: 'contain', height: '225px', border: '1px solid #c7c7c7', borderRadius: '15px', }} />
      </CardContent>
      <CardContent>
        <Typography textAlign='left' sx={{fontSize:{xs:16, md:20}, fontWeight:500}}>3. Printed & Mailed</Typography>
        <Typography textAlign='left' sx={{fontSize:{xs:16, md:20}}}>We print and mail at no-cost to you.</Typography>
      </CardContent>
    </Card>
    
    <Card sx={{ p:4, ml:3, mr:1}}>
<CardContent sx={{backgroundColor:'#e0e9f4', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Image src={miniTools} alt="Save the Date Card" style={{objectFit: 'contain', height: '225px', border: '1px solid #c7c7c7', borderRadius: '15px', }} />
      </CardContent>
      <CardContent>
        <Typography textAlign='left' sx={{fontSize:{xs:16, md:20}, fontWeight:500}}>4. Free digital tools</Typography>
      </CardContent>
    </Card>
  </Stack>

	<Button variant="outlined" color="secondary" sx={{ width:'fit-content', height:'fit-content', m: 3, fontWeight: 700, borderWidth: 2,
					"&:hover": { borderWidth: 2 }, // keep thickness on hover
				}}>Receive a sample</Button>



  </Grid>
{/* end Grid container row 3 */}

{/* Row 4 _______________________________________________________________________*/}

    <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth:'lg', mx:'auto', pb:2}}> 

      
  </Grid>
{/* end Grid container: row 4 */}

</Container>

	);
}