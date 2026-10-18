//http://127.0.0.1:3000/personalize/cardinput
//note: access allowed for 1. logged in or signed up 2. newselection or project in store. Upon save/next newselection clears, project populated, api set for project
'use client'
import * as React from 'react';
import {useState, useEffect, useRef} from 'react';

import {AppBar, Avatar, Box, Breadcrumbs, Button, Checkbox, Container, Divider, Grid, IconButton, FormControl, Paper, Stack, TextField, Typography} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// reach hook form
import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
//next
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { StaticImageData } from 'next/image'
import Link from 'next/link'

//Redux
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store/store';

import cardData from '@/public/card-stock/data/cardData.json'
import beigeCard from '@/public/card-stock/examples/Beige-Invitation.png'
import mediterraneanCard from '@/public/card-stock/examples/Mediterranean-Invitation.png'
import swanCard from '@/public/card-stock/examples/Swan-Invitation.png'

// keyed by the path strings in cardData.json
const cardImageMap: Record<string, StaticImageData> = {
  '/card-stock/examples/Beige-Invitation.png': beigeCard,
  '/card-stock/examples/Mediterranean-Invitation.png': mediterraneanCard,
  '/card-stock/examples/Swan-Invitation.png': swanCard,
}

// zod validation schema: matches the dynamic register calls in the map. z.record is used for keys, in this case (number, string)
const schema = z.record(z.string(), z.string().min(1));
type FormData = z.infer<typeof schema>; //type it using the inferred type from your zod schema:

export default function Personalize( ) {
  const router=useRouter()

  const auth_user = useSelector( (state:RootState)=>state.auth.user )
  if (auth_user != null) {const auth_userpk = auth_user.pk}

  const project = useSelector((state: RootState) => state.project);
  const newselection = useSelector((state: RootState) => state.newselection);

  //1. check for either project or newselection (mutual exclusive), then assign image and title accordingly
  //TODO: IF NEW SELECTION, CLEAR PROJECT, set NEW SELECTION AS PROJECT
  //TODO: IF NOT NEW SELECTION, USE PROJECT IF EXISTS
  
  
  const hasProject = Object.keys(project.cardObject).length > 0; 
  const card_object = (hasProject ? (project.cardObject) : newselection.cardObject) ?? ''; 
  const card_image_url = card_object.image
  const card_title = card_object.title
  const card_fields = card_object.fields ? card_object.fields ?? null : null; //an array of objects, fields:[{field:'field_1'},{text:'blah'}...]
  const card_image = card_image_url ? cardImageMap[card_image_url] ?? null : null;
  //typed as string | undefined, but cardImageMap[card_image_url] requires a definite string index.
  //?? is the nullish coalescing operator — it returns the right-hand side only when the left-hand side is null or undefined.

  // if the auth_user is zero length, re-direct to welcome
  //UNCOMMENT TO MAKE PRIVATE
  // React.useEffect(() => {
  //   if (!Object.keys(rep.formData).length) {
  //     router.push('/onboarding/welcome')
  //   }
  // }, [rep.formData, router])

//2. initialize RHF______________________________________________________react hook form 

//Use Array.reduce to transform the card_fields array into an object: The Array reduce() method iterate over an array and reduce their elements to a single value. accumulator is iterated into a dict derived from field.text
  const defaultValues = card_fields?.reduce((acc, field) => {
  acc[field.field] = field.text;
  return acc;
    }, {} as Record<string, string>);  // TS equivalent of a dict, Record<K, V> is a utility type that maps keys of type K to values of type V, so Record<string, string> is just { [key: string]: string }.

    const defaultsforwatch = card_fields?.map((field, index) => {`${field.field}.${field.text}`}); console.log ('defaultsforwatch', defaultsforwatch)

    const { control, formState, handleSubmit, register, watch, getValues } = useForm({
      mode: 'onBlur', //validate field onblur  
      resolver: zodResolver(schema),
      defaultValues
      });
    
  //form submission state: https://www.youtube.com/watch?v=ywipkBYdIAA&list=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s&index=24
  const { errors, 
    touchedFields, //object containing all the inputs the user has interacted with.
    dirtyFields, //object with the user-modified fields
    isDirty, //when the form has been changed
    isValid, //Set to true if the form doesn't have any errors.
    isSubmitSuccessful } = formState;

  const watchFields=watch( [ "field_1", "field_2", "field_3", "field_4"] ); //the name of registered field

  const [activeIndex, setActiveIndex] = useState<number | null>(null); //highlights watchfields

//Make watchfields responsive to viewsize. a. set ref and state b. employ observer of containerwidth c. scale to new containerwidth 
const containerRef = React.useRef<HTMLDivElement>(null);
const [containerWidth, setContainerWidth] = useState<number>(400);
const REF_SIZE = 400; // baseline px width matching your positionTop/fontSize design values
const scale = containerWidth / REF_SIZE;

React.useEffect(() => {
  const el = containerRef.current;        // "get me the actual DOM element (the room)"
  if (!el) return;                        // "if the room doesn't exist yet, do nothing"
  const observer = new ResizeObserver(entries => {   // "hire a guard who watches for size changes"
    setContainerWidth(entries[0].contentRect.width); // "whenever the room resizes, record the new width"
    });
    observer.observe(el);                   // "guard, start watching that specific room"
  return () => observer.disconnect();     // "when this component unmounts, fire the guard (cleanup)"
  }, []);


//2. Save new greetingcard to database   object presented by form: { field_1: "save the date", field_2: "me and you", field_3: "date", field_4: "address " }
const onSubmit = async (formdata: FormData) => {console.log(formdata)}

return ( 
<Container disableGutters maxWidth="xl" >

  <Breadcrumbs aria-label="breadcrumb" sx={{mt:2, mb:3}}>
    <Link underline="hover" color="inherit" href="/">
      Home
    </Link>
    <Typography sx={{ fontWeight:'675' }}>Personalize your card</Typography>
  </Breadcrumbs>

  <Grid size={12} sx={{border:1, borderColor:'lightgray', mb:2}}></Grid>
  {/* divider line at top of page */}
  

{/* ROW 1 ______________________________________________________________________________________________*/}
  <Grid container sx={{display:"flex", alignItems: 'flex-start', justifyContent: 'center', borderLeft:1,borderRight:1, borderBottom:1, borderColor: 'lightgray'}}>            

{/* COLUMN 1 CARD PREVIEW */}

    <Grid size = {{xs:12, md: 7}} sx={{ display:"flex", alignItems: 'center', justifyContent: 'center', objectFit: 'contain', borderRight: 1, py:3}}> 

      <Box ref={containerRef} sx={{ position: 'relative', width:'80%', aspectRatio: '3/3', m:2 }}> 

      {card_image && <Image src={card_image} alt="card" fill style={{ objectFit: 'contain' }} />}

    {/* Generates Watch Fields over Card  */}
      <Stack direction='column' sx={{ alignItems: 'center' }}> 
        {/* optional chaining skips null fields */}
        {card_fields?.map((field, index) => (
          <Typography key={index} sx={{ zIndex: 1, position: 'absolute', left: '50%', transform: 'translateX(-50%)', borderRadius: '4px', //left: '50%' moves the left edge to the midpoint, then translateX(-50%) shifts it back by half its own width
            fontFamily: `var(--font-${field.font})`,
            fontSize: field.fontSize * scale,
            top: `${parseFloat(field.positionTop) * scale}px`, //parseFloat strips the 'px' unit to get the number 100.
            outline: activeIndex === index ? '2px solid #1976d2' : 'none',
          }}>
            {watchFields[index]} 
          </Typography>
        ))
        }
        {/* end map */}
      </Stack>
    </Box>
  </Grid>

{/* COLUMN 2 FORM ENTRY___________________________________*/}
  <Grid size = {{xs:12, md: 5}} sx={{ flexDirection: 'column', display:"flex", alignItems: 'center', justifyContent: 'center', objectFit: 'contain', pr:1}}> 

{/* ROW 1 */}
    <Box sx={{borderBottom:1, borderColor:'lightgray'}}>
      <Typography sx={{fontSize:'16pt', textAlign:'left', color: '#764b36', mt:1, mb:2}}>{card_title}</Typography>
    </Box>

{/* ROW 2 */}
    <Typography sx={{ textAlign: 'left', fontSize:'20pt', mt: 3}}>
      Personalize your card 
    </Typography>


{/* FORM FIELDS _________________________________________________________________*/}
    <form noValidate onSubmit={handleSubmit(onSubmit) }>

{/* generates form fields from carddata: looks like: { title:'', fields:[] } */}
    <Stack direction='column' sx={{display:'inline-block', mx:4}} >

{card_fields?.map((field, index) => {

    const { onBlur: rhfOnBlur, ...fieldProps } = register(field.field);
    return (
      <React.Fragment key={index}>
        <TextField
          label="" variant="outlined" sx={{ mb:2, width:'100%' }}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          onFocus={() => setActiveIndex(index)}
          onBlur={(e) => { rhfOnBlur(e); setActiveIndex(null); }}
          {...fieldProps} />
        {errors[field.order] && <span>{errors[field.order]?.message?.toString()}</span>}
      </React.Fragment>
      );  // <-- also change the closing )) to ); })
      })}


    </Stack>
      <Button type="submit" variant="contained" onClick={handleSubmit}>
          Next
      </Button>
    </form>


  </Grid>
  {/* end COLUMN 2 */}

{/* End grid container*/}
</Grid>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
</Container>

  )
}

