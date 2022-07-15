import React from 'react';
import './App.css';
import { Container, Box, Grid, Typography, TextField, Button, Alert, Snackbar } from '@mui/material';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PokemonDetails from './PokemonDetails';
import {Response, Result, SubmitData, Details, DisplayInfo} from './types';

const url = "https://pokeapi.co/api/v2/pokemon/";
let apiData: Result[] = [];

const App:React.FC = () => {
  const axios = require('axios').default;

  const [pokemonList, setPokemonList] = useState<Result[]>([]);
  const [displayInfo, setDisplayInfo] = useState<DisplayInfo>({});
  const [isShown, setIsShown] = useState<boolean>(false);
  const [snackBarErrorIsOpen, setSnackBarErrorIsOpen] = useState<boolean>(false);
  const [snackBarSuccessIsOpen, setSnackBarSuccessIsOpen] = useState<boolean>(false);
  const [snackBarMsg, setSnackBarMsg] = useState<string>("");

  const { control, handleSubmit } = useForm();

  useEffect(() => {
    axios.get(url)
    .then( (response: Response) =>{
      apiData = response.data.results;
      console.log(response);
      setPokemonList(apiData)
    })
    .catch((error: any) =>{
      console.log(`Hubo un error ${error}`);
    })
  }, []);  
  

  const onSubmit = async (data: SubmitData) =>{

    const pokemonIndex = checkPokemon(data.searchTerm);
    
    
    if(pokemonIndex >= 0){
      const url = pokemonList[pokemonIndex].url ?? "/";
      const details: Details = await getDetails(url);
      setDisplayInfo({...pokemonList[pokemonIndex], ...details})
    }else{
      setSnackBarMsg("That pokemon isn't in the list");
      setSnackBarErrorIsOpen(true);
    }

  }

  const getDetails = async (url: string) => {
    
    try {
      
      const response = await axios.get(url);
      
      
      let imgUrl = response.data.sprites.other["official-artwork"].front_default;
      return ({abilities: response.data.abilities, img:imgUrl, type: response.data.types})
      
    } catch (error) {
      setSnackBarMsg("Hubo un error obteniendo los detalles del pokemon");
      setSnackBarErrorIsOpen(true);
      console.log(`Hubo un error: ${error}`)
      return ({abilities: "", img:"", type: ""});
    }    

  }
  const pokemonClick = () =>{
    setIsShown(current => !current);
  }

  const deletePokemon = (name: string) =>{
  
    const arrCloned = [...pokemonList];

    if (name === ""){
      return
    }

    const pokemonIndex = arrCloned.map( item => item.name).indexOf(name);
    
    if(pokemonIndex >= 0){
      let removedPokemon = arrCloned.splice(arrCloned.map( item => item.name).indexOf(name), 1 );      
      setPokemonList(arrCloned);
      setDisplayInfo({});
      setSnackBarMsg("Pokemon eliminado exitosamente!!");
      setSnackBarSuccessIsOpen(true);
    }
    else{
      setSnackBarMsg(`El pokemon no existe o ha sido eliminado`)      
      setSnackBarErrorIsOpen(true);
    }
  }

  const checkPokemon = (name: string) =>{
    const arrCloned = [...pokemonList];
    const pokemonIndex = arrCloned.map( item => item.name).indexOf(name);
    return pokemonIndex;    
  }

  const changeShown = ()=>{
    setIsShown(current => !current);
  }
  const handleSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string) =>{
    if (reason === "clickaway")
    {
      return;
    }
    setSnackBarErrorIsOpen(false);
  }
  const handleSnackBarSuccessClose = (event: React.SyntheticEvent | Event, reason?: string) =>{
    if (reason === "clickaway")
    {
      return;
    }
    setSnackBarSuccessIsOpen(false);
  }


  if (apiData.length <= 0 ) return null
  
  return (
    <Box>
      <Grid container >
        <Grid item xs={12} sx={{textAlign:"center", verticalAlign:"bottom"}}>
          <Typography variant='h1' gutterBottom sx={{fontSize:"3rem"}} >Pokemon list</Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{display:"flex", justifyContent:"center", alignItems:"end", marginBottom:"15px"}} >
             <label>
               Pokemon name: 
             </label>
               <Controller
                name="searchTerm"
                control={control}
                defaultValue=""
                rules={ {required: true, pattern: {value: /^[A-Za-z]+$/, message: 'input a valid text'}, minLength : {value: 3, message: `min length is 3` }, maxLength : {value: 30, message: `max length is 30` }}}
                render={({
                    field,
                    fieldState: { error },
                    formState
                  }) => (
                    <TextField
                        label="Search for a pokemon"
                        type="text"
                        size="small"
                        variant="outlined"
                        {...field}
                        error={error ? true: false}
                        helperText={error && `Field ${error.type} ${error.message}`}
                        sx={{margin:"0 10px"}}
                    />
                )}
                />
             <Button id="submit" variant="contained" type="submit" >Search</Button>
          </form>
        </Grid>
        <Grid  item xs={4} sx={{border:"3px solid #000"}}>
          <Container component="div" sx={{borderBottom:"3px solid #000", padding:"10px 0", textAlign:"center"}}>
            <Typography variant="h3" sx={{fontSize:"1.5rem"}} >Pokemon name</Typography>
          </Container>
          <Container component="div" >
            <Typography onClick={pokemonClick} variant="h6" >{displayInfo.name }</Typography>
          </Container>
        </Grid>
        <Grid item xs={4} sx={{border:"3px solid #000"}} >
          <Container component="div" sx={{borderBottom:"3px solid #000", padding:"10px 0", textAlign:"center"}}>
            <Typography variant="h3" sx={{fontSize:"1.5rem"}}>
              Pokemon Image
            </Typography>
          </Container>
          <Container component="div" sx={{textAlign:"center"}}>
            <img src={displayInfo.img} alt={`Pokemon ${displayInfo.name ?? ""}`} style={{width:"100%", height:"auto", maxWidth:"200px"}} />
          </Container>
        </Grid>
        <Grid item xs={4} sx={{border:"3px solid #000"}}>
          <Container component="div" sx={{borderBottom:"3px solid #000", padding:"10px 0", textAlign:"center"}}>
            <Typography variant="h3" sx={{fontSize:"1.5rem"}} >Actions</Typography>
          </Container>
          <Container component="div" sx={{textAlign:"center"}}>
            <IconButton onClick={() => deletePokemon(displayInfo.name ?? "")} aria-label="delete" size="large">
              <DeleteForeverIcon fontSize="inherit" />
            </IconButton>
          </Container>
        </Grid>
      </Grid>          
        {isShown && <PokemonDetails details={displayInfo} changeShown={changeShown} /> }
        <Snackbar open={snackBarErrorIsOpen} autoHideDuration={6000} onClose={handleSnackBarClose}>
          <Alert onClose={handleSnackBarClose} severity="error" sx={{ width: '100%' }}>
            {snackBarMsg}
          </Alert>
        </Snackbar>   
        <Snackbar open={snackBarSuccessIsOpen} autoHideDuration={6000} onClose={handleSnackBarSuccessClose}>
          <Alert onClose={handleSnackBarSuccessClose} severity="success" sx={{ width: '100%' }}>
            {snackBarMsg}
          </Alert>
        </Snackbar>
    </Box>
  );
}

export default App;
