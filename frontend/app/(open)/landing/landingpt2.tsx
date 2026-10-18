//responsive: Ensure images use width: '100%' with maxHeight and objectFit to fill their grid cell.
//MUI
import {Box, Button, Card, CardContent, Container, Divider, Grid, Paper, Stack, Typography} from '@mui/material';
//NEXT
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

import vertRnbw from './assets/landing2/vertRnbw.png';
import coupleLaptop from './assets/landing2/flow1.png';
import fashionShoppingBags from './assets/landing2/flow2.png';
import mailBox from './assets/landing2/landinghiwflow2.png';
import weddingCelebration from './assets/landing2/landinghiwflow4.png';
import flow from './assets/landing2/flow3.png';
import hiwLanding from './assets/hiwLanding2.png';
import { maxHeight } from '@mui/system';

type Step = {
    order: string,
    heading: string,
		description: string,
    photo: StaticImageData
	}

const HowWorks:Step [] = [
  {
    order: '1',
    heading:'Write it online',
		description: 'Compose and customize online.',
    photo: coupleLaptop
  },
  {
    order: '2',
		heading: "Sponsor\'s Ads Inserted",
		description: 'Made possible by generous sponsors',
    photo: fashionShoppingBags
  },

	// {
  //   order: '3',
	// 	heading:'Cards printed and mailed',
	// 	description: 'We print and mail the cards for free.',
  //   photo: mailBox
  // },

	]

export default function Pricing() {
	return (

		<Container maxWidth={false} sx={{ 
			maxWidth:'xl',
			px: { xs: 1 } }}>

{/* row1 */}
      <Grid container>
        {/* col1 */}

        {/* col2 */}
        <Grid size={{xs:6}} sx={{display:'flex', justifyContent:'flex-start'}}>
          <Stack sx={{ml:3}}>
          <Typography textAlign='left' sx={{
                fontSize: 'clamp(1rem, 2vw, 2rem)',  //CSS clamp(): (min, preferred (viewport-relative), max); So 5vw means the font size is 5% of the viewport width. On a 1000px-wide window that's 50px;
                color: '#764b36', fontWeight: '450', letterSpacing:1, lineHeight: 1.2, textAlign: 'left', mb:1, mt:4 }} >
            No-cost printing and mailing 
          </Typography>

          <Typography textAlign='left' sx={{
                fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',  //CSS clamp(): (min, preferred (viewport-relative), max); So 5vw means the font size is 5% of the viewport width. On a 1000px-wide window that's 50px;
                color: '#764b36', fontWeight: '400', letterSpacing:1, lineHeight: 1.2, textAlign: 'left', pt:0, mb:3, mt:2 }} >
            Made possible by sponsors
          </Typography>
          </Stack>
        </Grid>

        <Grid size={{xs:6}} sx={{display:'flex', justifyContent:'flex-end'}}>          
          <Image src={vertRnbw} alt="" style={{ maxHeight:'200px', objectFit: 'contain' }} />
        </Grid>

      </Grid>

{/* row2 */}
      {/* <Box sx={{display:'flex', justifyContent:'center'}}> */}
			<Grid container sx={{ maxWidth:'xl', backgroundColor: 'lightblue', borderRadius:3, border:1}}>
        

        
        <Grid size={{sm:12}} sx={{display:'flex', alignItems:"center", justifyContent: "center", pr:2, mt: 1}}>
          <Image src={flow} alt='' style={{ maxHeight:'375px', objectFit: 'contain' }}/>
        </Grid>

      </Grid>
      {/* </Box> */}
{/* end row2*/}

      <Box sx={{display: 'flex', alignItems:"center", justifyContent: "center",}}>
        <Button variant="outlined"  size= 'medium' 
        sx={{ color: 'black',width:'fit-content', height:'fit-content', fontWeight: 400, border:1, boxShadow: '0 0 0 3px lightblue', m:4}}>
          Get a demo card
        </Button>
      </Box>
<Divider />
</Container>
	);
}
