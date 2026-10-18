//Page not in use
'use client'
import React from "react";
import { Breadcrumbs, Container, Box, Link } from '@mui/material';
import { sizing } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useParams, useRouter } from 'next/navigation'

//Redux
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store/store'; //type for state data

import CardInput from "./card-input_Delete";
import CardPreview from "../../(open)/preview/cardpreview";
import CardGallery from "@/app/(open)/landing/cardgallery";
// import ProjectCard from "./components/ProjectCard";

export default function Personalize() {

    const auth_user = useSelector( (state:RootState)=>state.auth.user )
    if (auth_user != null) {const auth_userpk = auth_user.pk}

    //load selected card from store
    // const selected_card = useSelector((state: RootState)=>state.selcardprelogin)

    //obtain id of the chosen card style from the url param personalize/cardId
    // const params = useParams<{ cardId: string; }>(); console.log('params', params)
    const router = useRouter()
    // pattern as /personalize/:cardId is matched by /personalize/123 then params.cardId will be "123".

    //TODO install current project info in place of new card, if exists

    return (
      <div className="App">
      <Container maxWidth="lg">
        
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>

          <Typography sx={{ fontWeight:'800' }}>Personalize your card</Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex',justifyContent: 'center'}}  >

{/* if auth_user is null, show cardpreview, else if params = cardId, show cardInput, else go home */}
          {/* {auth_user == null             
          ?
            <CardPreview />
          :
            selected_card
            ?
            <CardInput />
            :
            null
          } */}

        </Box>
      </Container>
      </div>
    );  
    };