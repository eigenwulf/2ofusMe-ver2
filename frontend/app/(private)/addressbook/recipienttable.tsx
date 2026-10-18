//Concept: Initially display user's address book. Highlights those entries already assigned to current card. When new entry is added, display re-renders. When entry is clicked it is (un)highlighted.
//TODO CHANGE - Restrict access to only those with a greetingcard id in project in order to enter this page, this page to be accessed from either dashboard or personalize
'use client'
import React, { useMemo, useState, useContext, useRef, useEffect } from 'react';
import { Alert, Box, Button, Card, CardActions, CardActionArea, CardContent, CardMedia, Container, Grid, IconButton, Snackbar, Stack, Table, TextField, Typography, Paper, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Divider from '@mui/material/Divider';
//nextjs
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { StaticImageData } from 'next/image'
import Link from 'next/link'
//Redux
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store'; //type for state data
import type { Address } from '../../store/features/addressbook/addressbookSlice';
import { useListrecipientsQuery, useUpdaterecipientMutation, useLazyRetrievegreetingcardrecipientsQuery, useCreategreetingcardrecipientMutation, useDeletegreetingcardrecipientMutation } from '../../store/features/api/apiSlice';
import { setAddressBook, addToAddressBook } from '../../store/features/addressbook/addressbookSlice';
import { addProjectRecips, removeProjectRecips, updateProjectRecips, clearProjectRecips } from '../../store/features/project/projectSlice';

import RecipDialog from './recipientdialog';

export default function RecipientTable() {

  // Initialize Redux hooks
  const router = useRouter()
  const dispatch = useDispatch() //dispatch modifies the store
  const [createGreetcard_Recip, { data: createdGreetcardRecipData, isSuccess: isCreateGreetcardRecipSuccess }] = useCreategreetingcardrecipientMutation() //The useMutation hook returns a tuple containing a "mutation trigger" function, as well as an object containing properties about the "mutation result".
  const [retrieveGreetcard_Recip, { data: retrievedGreetcardRecipData, isSuccess: isRetrieveGreetcardRecipSuccess }] =  useLazyRetrievegreetingcardrecipientsQuery() //use the lazy query so you can trigger a lookup inside handleCardClick  
  const [deleteGreetcard_Recip, { data: deletedGreetcardRecipData, isSuccess: isDeleteGreetcardRecipSuccess }] = useDeletegreetingcardrecipientMutation() 
  //API: retrieves recipients associated with user, automatically re-fetches with changes in database, when api is updated, created or queried ie. when useListrecipientsQuery is called. 
  const { data: recipListData, isSuccess: isRecipListSuccess } = useListrecipientsQuery() 

  const project = useSelector ((state:RootState)=>state.project) //Obtain current greetingcard. selector loads slice

//_________________________________________________________________________________________________________________________
  //PART 1: DISPLAY ADDRESSBOOK: retrieve list of recipients from api for user. Then set in addressbook store.

    // useState
  // const [highlightedEntries, setHighlightedEntries] = useState([]); //recipients that should be highlighted
  // Track manual additions/removals from clicks only, since can't be done inside useEffect
  const [manualAdded, setManualAdded] = useState<number[]>([]);
  const [manualRemoved, setManualRemoved] = useState<number[]>([]);

  const [errorOpen, setErrorOpen] = useState<boolean>(false);

  //STORE:
  const addressbook = useSelector ( (state:RootState)=>state.addressbook ) //Obtain addresssbook from store: addressbook format: {entries: [{id:..,greetingcards:[4,5]}, {...}...]
  //INVALIDATETAG: apiSlice triggers re-render of addressbook whenever updaterecipient is called in RecipientEnvelope

   //populate table, initialize highlighting states and store_________________________________________________________________________________________________________________________

  // Effect 1: query recipListData, set addressbook in store, populate UI table
  useEffect(() => {
    if (isRecipListSuccess && recipListData) {
      dispatch(setAddressBook(recipListData));
    }
    }, [isRecipListSuccess, recipListData, dispatch]);

  const cardId = project.cardObject.id;

  //USEMEMO 2: activates whenever manualAdded, manualRemoved are modified, then modifies highlightedEntries
  // Fetches full list of user's recipients, filters for current card, merge with manualAdd and manualRemove into highlight array
  const highlightedEntries = useMemo(() => {
    if (!recipListData || cardId === undefined) return manualAdded; //start with api recipients list
    const filtered_recips = recipListData
      .filter(entry => entry.greetingcards?.includes(cardId)) //filter the recipient list [the greetingcards array] for the current project
      
    const selected_recips = filtered_recips.map(entry => entry.id) //transform sel_recips into array of ids
      .filter((id): id is number => id !== undefined); //tells TypeScript: "when this function returns true, treat id as number going forward." The actual runtime check is still just id !== undefined — the : id is number only affects the inferred type of the resulting array.

    //merge selected_recips with manualAdded and filter manualRemove to get highlight array
    return [...new Set([...selected_recips, ...manualAdded])].filter(id => !manualRemoved.includes(id));  //new Set removes duplicate values, spread...converts to array
    }, [recipListData, cardId, manualAdded, manualRemoved]);

 //handleclick Highlighting_________________________________________________________________________________________________________________________

//
//to trigger useMemo. updates highlight state, but Store is not updated. Store updated later at add recipient dialog and at handle click finish. 
  const handleCardClick = (index:number, addressEntry:Address) => {  //addressEntry comes from click prop
    console.log('state of addressEntry.id and highlightedEntries at handleCardClick ', addressEntry.id, highlightedEntries)
    const id = addressEntry.id;
    if (id === undefined) return;
    // if (addressEntry.id && highlightedEntries.includes(addressEntry.id)) {   //if entry id already in highlighteEntries array, remove and unhighlight    
    console.log('unhighlighting', addressEntry.id)
    // STORE NOT TO BE UPDATED UNTIL LATER: dispatch(removeProjectRecips(addressEntry.id) ); //remove recipient from store
    if (highlightedEntries.includes(id)) {
    // unhighlight
    setManualRemoved(prev => [...prev, id]); //add the id to the to-be-removed array
    setManualAdded(prev => prev.filter(i => i !== id)); //remove the id from the to-be-added array
  } else {
  // highlight
    setManualAdded(prev => [...prev, id]);
    setManualRemoved(prev => prev.filter(i => i !== id));  }
  }; 

//Edit Recipient Dialog_________________________________________________________________________________________________________________________
  const [dialogState, setDialogState] = useState(false);
  // const [dialogRecipPk, setDialogRecipPk] = useState(null);
  const [dialogAddressEntry, setDialogAddressEntry] = useState<Address | null>(null);

//address object prop sent to RecipDetailDialog for editing.
  const handleOpenDialog = (addressEntry:Address) => {
    setDialogState(true);
    setDialogAddressEntry(addressEntry)
    };

// close the dialog
  const handleCloseDialog = () => {
    setDialogState(false);
    };

//Finish and Next_________________________________________________________________________________________________________________________
  //Save, navigate to summary screen, finalize recipient assignments from highlight array
  const handleClickFinish = async () => {
    const current_card_id = project.cardObject.id; console.log ('current card for the project', current_card_id)
    //Part 1: remove cards notated in manualRemoved from GreetingCard_Recipient join table
    //API: remove greeting card object from Recipient's greeting_card field, by removing the entry from GreetingCard_Recipient join table
    //a. query for relation object with greetcard and recip ids, b.delete result from join table
    try {
      await Promise.all(manualRemoved.map( async removeId =>{      //.map() callback is async, so the await calls inside it are valid.
        const relation = await retrieveGreetcard_Recip({ greetingcard_id: current_card_id, recipient_id: removeId }).unwrap()
          .catch(err => { console.log('not removed', err); throw err; }); //.unwrap() returns a plain Promise, so you can chain .catch() on it. 
        const relationId = relation[0]?.id ?? relation[0]?.pk; // ?? is the nullish coalescing operator, get the first result's primary key, trying id first, then pk as a fallback.,  use id, but if it's null or undefined, use pk instead.
        await deleteGreetcard_Recip(relationId ).unwrap();  //delete the greetingcard - recipient relation, await the delete and unwrap the result (throws on error)
        } ) )
      
    //Part 2: add cards notated in manualAdd to GreetingCard_Recipient join table
     await Promise.all(manualAdded.map( async addId =>{      //.map() callback is async, so the await calls inside it are valid.
        const result = await createGreetcard_Recip({'recipient': addId, 'greetingcard': current_card_id}).unwrap()
          .catch(err => { console.log('not added', err); throw err; })
        ; console.log('added recipient to prject', result)
      } ) )

      // if either Promise.all throws, the catch fires and router.push is never reached.
      router.push('/summary')
    }catch(err) {console.error ('Failed to update greetingcard_recipient relation:', err ); setErrorOpen(true)} //snackbar opens below
  
  };

//___________________________________________________________
return (
<Container>
  <Grid container spacing={1}>
    <Grid sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}} size={{xs:12}}>

      <Paper elevation ={1} sx={{ mt: 2 }}  >Click on addresses to highlight recipients for this card</Paper>
      
      <Button variant="contained" color="success" onClick={handleClickFinish}>
      Finish and Next
      </Button>
    </Grid>

      {/* BEGIN TERNARY OPERATOR.  Map over address book and display (addresssbook) */}
      {/* if recip pk is not in useState, highlight or unhighlight as selected */}
      { addressbook && addressbook.entries.length > 0 
        ? 
          addressbook.entries.map( (addressEntry, index) => (
            <Grid size={{xs:6, md:4}} key={index} sx={{ p:1}}>          
              <Card variant="outlined">
                <CardActionArea
                  onClick={() => handleCardClick(index, addressEntry)}
                  // data-active={highlightedEntries.includes(addressEntry.id) ?  'true' : undefined}   
                  data-active={addressEntry.id !== undefined && highlightedEntries.includes(addressEntry.id) ? 'true' : undefined}
                  sx={{
                    height: '100%',
                    '&[data-active]': {
                      backgroundColor: 'action.selected',
                      '&:hover': {
                        backgroundColor: 'action.selectedHover',
                      },
                    },
                  }}
                >
                <Box>
                  {/* text to go with highlighting */}
                  { addressEntry.id !== undefined && highlightedEntries.includes(addressEntry.id)
                  ? <Box  sx={{ color: 'info.dark' }}>Added to mail bag</Box>
                  : <Box  sx={{ color: 'warning.dark' }}>Click to send</Box>
                  }
                </Box>

                <CardContent>
                <Stack direction={"row"} spacing={{ xs: 1 }}>
                  <Typography> {addressEntry.name} </Typography> 
                  <Typography> {addressEntry.street_address} {addressEntry.locality}, {addressEntry.state} </Typography> 
                </Stack>
                </CardContent>
              </CardActionArea>

              <CardActions sx={{display:'flex', justifyContent: 'space-around', alignItems: 'center'}}>

                <IconButton size="small" onClick={ ()=> handleOpenDialog (addressEntry) } >
                  <ModeEditOutlineIcon />
                </IconButton> 

              </CardActions>
              {/* </CardActionArea> */}

            </Card>
          </Grid>
          ) 
        )  
        // end callback function
        : 
        (<></>)
        // finish ternary operator 

      }
  </Grid>

    {/* dialog appears upon clicking IconButton: handleOpendialog and dialogState are set to true. Then passes pk as prop to dialog */}
    <RecipDialog open={dialogState} onClose={handleCloseDialog} addressProp={dialogAddressEntry} // Pass the selected pk as a prop, obtained from clicking edit icon
    />

<Snackbar open={errorOpen} autoHideDuration={4000} onClose={() => setErrorOpen(false)}>
  <Alert severity="error">Failed to save recipients. Please try again.</Alert>
</Snackbar>
{/* Snackbar is a brief, non-blocking notification that appears (typically at the bottom of the screen) to inform the user of something — success, failure, etc. — and then disappears automatically. */}

</Container>
  );
}

//useSelector:
//automatically subscribes to the Redux store. Hence, whenever an action is dispatched, it will call the selectTodosfunction. If the value returned by the selectTodos has been updated, useSelector will force the TodoList component to re-render with the new data.
// https://dev.to/efkumah/how-to-manage-state-in-a-react-app-using-redux-5pc