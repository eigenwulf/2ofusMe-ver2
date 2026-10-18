//responsive: Ensure images use width: '100%' with maxHeight and objectFit to fill their grid cell.
//MUI
import {Box, Button, Card, CardMedia, CardContent, CardActions, Container, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography} from '@mui/material';
import {Inbox, Drafts, Redeem, Laptop, RoomService } from '@mui/icons-material';
//NEXT
import Image from 'next/image';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';

import ContactInitial from './contactinitial'
import flowWheels from './assets/howWorks2.png';
import collage from './assets/lifestyleCollage.png';
import coupons from './assets/iStockCoupons.jpg';
import justMarriedCar from './assets/iStockjustmarriedCar.jpg';
import coupleSunglasses from './assets/coupleSunglasses.png';

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
  <Box sx={{backgroundColor:'#d8a790',m:0, p:0}}>

    <Typography textAlign='center' sx={{ fontSize: '24pt', fontWeight: '450', color: 'white', letterSpacing:1, lineHeight: 1.2, textAlign: 'center', pt: 5, }} >
      One Less Expense for Happily Ever After
    </Typography>
    <Typography textAlign='center' sx={{ fontSize: '20pt', fontWeight: '450', color: 'white', letterSpacing:1, lineHeight: 1.2, textAlign: 'center', pt: 2, pb:3}} >
      How It Works
    </Typography>

{/* ROW 2_____________________________________________________________________________________________________________________ */}

{/* col1 */}
    <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth:'xl', mx: 'auto', pb:5}}> 
      {/* mx: 'auto' is what centers the Grid itself within the parent when it has a constrained maxWidth. */}

      <Grid size={{xs:12, sm:5}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
        <Image src={collage} alt="collage graphic" style={{ width:'80%', maxHeight: 410, objectFit: 'contain' }}/>
      </Grid>

{/* col2 */}
    <Grid size = {{xs:12, sm:7}} sx={{ display:"flex", alignItems: 'flex', justifyContent: 'flex-start',  objectFit: 'contain', pl:1}}> 
      <Stack direction='column' sx={{width:'100%', mr:5, pl:-5}}>

      <Image src={flowWheels} alt="how it works flow diagram" style={{  maxHeight: 400, width: '100%', objectFit: 'contain', border: '1px solid #c7c7c7', borderRadius: '15px', padding:'1px' }} />

      <Typography textAlign='center' sx={{fontSize:{xs:20, sm:26}, pt:3, color: 'ivory'}}>You personalize online, we print and mail for free</Typography>
      <Typography textAlign='center' sx={{fontSize:{xs:18, sm:22}, color: 'ivory'}}>Made possible by our generous advertising sponsors</Typography>

      </Stack>
    </Grid>

  </Grid>
{/* end Grid container */}
  </Box>

{/* ROW 3_____________________________________________________________________________________________________________________ */}

{/* col1 */}
  <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth:'xl', mx: 'auto',}}> 

    <Grid size={1} ></Grid>

    <Grid size={{xs:11, sm:6}} sx={{mb:5}}>

      <Box sx={{width: '90%', maxWidth:'570px'}}>
        <Typography textAlign='center' sx={{fontSize:{xs:24, sm:28}, fontWeight: 600, pt:3}}>Sponsorship</Typography>
        <Typography textAlign='center' sx={{fontSize:{xs:18, sm:22}, pt:3, pb:3}}>We match your ad sponsors to the occasion. </Typography>
        <Typography textAlign='left' sx={{ fontSize:{xs:18, sm:20}, pb: 3}}>Your card recipients will appreciate the special deals and coupons ready for your big day.</Typography>

        <Image src={coupons} alt="array of coupons" style={{ width:'100%', height:'auto', objectFit: 'contain' }}/>
      </Box>

	<Button variant="outlined" color="secondary" sx={{ width:'fit-content', height:'fit-content', m: 3, fontWeight: 700, borderWidth: 2,
					"&:hover": { borderWidth: 2 }, // keep thickness on hover
				}}>Receive a sample</Button>

    </Grid>

{/* col2 */}
    <Grid size = {{xs:12, sm:5}} sx={{ mb:5}}> 
      <Box sx={{borderRadius:'15px', overflow: 'hidden'}}>

      <Image src={justMarriedCar} alt="" style={{  maxHeight: 400, width: '90%', objectFit: 'cover', borderRadius: '15px', overflow: 'hidden' }}/>
      
      </Box>
      <Typography textAlign='center' sx={{fontSize:{xs:18, sm:22}, pt:3}}>We handle the printing , mailing, and costs. <br/>So you can be on your merry way.</Typography>
    </Grid>

<Grid size ={{xs:10}} sx={{border:'1px solid', borderColor:'lightgray'}}></Grid>

</Grid>
{/* end Grid container row 3 */}

{/* Row 4 _______________________________________________________________________*/}

    <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth:'lg', mx:'auto', pb:2}}> 

      {/* col 1 */}
      <Grid size={{xs:12, sm:6}} sx={{display:'flex', justifyContent:'center', mt:5}}>

        <Grid container sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>

          <Typography textAlign='center' sx={{ fontSize:{xs:24, sm: 28}, fontWeight: '600', width:'100%', mb:5}}>
            Digital tools
          </Typography>

          {Tools.map( (i, index) => {return(
          <>
            <Grid size={1.5} sx={{border:1}}><Typography sx={{fontFamily: 'var(--font-montserrat)', fontSize:'30pt', alignSelf: 'flex-start'}}>{i.order}</Typography></Grid>
            <Grid size={9}><Typography sx={{fontSize:'20pt',}}>{i.heading}</Typography>
              <Typography sx={{fontSize:'16pt', mb:5}}>{i.description}.</Typography>        
            </Grid>
            <Grid size={1.5} ></Grid>
          </>
            )}
          )}

        </Grid>
      </Grid>
      {/* end grid container/col1 */}

{/* col2 */}
    <Grid size={{xs:12, sm:6}} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mt:5}}>

      <Image src={coupleSunglasses} alt="" style={{  maxHeight: 600, width: '100%', objectFit: 'contain'}} />

    </Grid>

{/* col3 */}
    <Grid size={{sm:1}}></Grid>

  </Grid>
{/* end Grid container: row 4 */}

</Container>

	);
}