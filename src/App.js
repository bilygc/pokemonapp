import './App.css';
import { useState, useEffect } from 'react';

const url = "https://pokeapi.co/api/v2/pokemon/";
let apiData = [];

function PokemonDetails({details}){

  const closeButton = () =>{
    document.querySelector(".overAll").classList.toggle("overAll-hide");
    document.querySelector(".details").classList.toggle("details-show")
  }
  return(
    <div className='details'>
      <h2 className='title'>{details.name}</h2>
      <span className='close' onClick={() => closeButton()} >X Close</span>
      <div className="imageDetails">
        <img src={details.img} alt={details.name} />
      </div>
      <div className="abilities">
        <h4>Abilities:</h4>
        <ul>
          {details.abilities.map( abs =>(
            <li key={abs.ability.name}>{abs.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function App() {
  const axios = require('axios').default;

  const [pokemonList, setPokemonList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [details, setDetails] = useState({name:"", abilities:[], img: ""})

  useEffect(() => {
    axios.get(url)
    .then( (response) =>{
      apiData = response.data.results;
      setPokemonList(apiData)
    })
    .catch((error) =>{
      console.log(`Hubo un error ${error}`);
    })
  }, []);

  const handleSubmit = (event) =>{
    event.preventDefault();

    const pokemonIndex = checkPokemon(searchField);

    if(pokemonIndex >= 0){
      setPokemonList(searchField === "" ? pokemonList : pokemonList.filter(x => x.name === searchField ));
    }else{
      alert("that pokemon doesnt exist in the list");
    }

  }

  const getDetails = async (url) => {
    
    try {
      
      const response = await axios.get(url);
      
      let imgUrl = response.data.sprites.other["official-artwork"].front_default;
      setDetails({name: response.data.name, abilities: response.data.abilities, img: imgUrl});
      document.querySelector(".details").classList.toggle("details-show");
      document.querySelector(".overAll").classList.toggle("overAll-hide");
      
    } catch (error) {
      console.log(`Hubo un error: ${error}`)      
    }    

  }
  const resetList = () =>{
    setPokemonList(apiData);
  }

  const deletePokemon = (name) =>{
    const arrCloned = [...pokemonList]
    const pokemonIndex = arrCloned.map( item => item.name).indexOf(name);
    
    if(pokemonIndex >= 0){
      let removedPokemon = arrCloned.splice(arrCloned.map( item => item.name).indexOf(name), 1 );      
      setPokemonList(arrCloned);      
    }
  }

  const checkPokemon = (name) =>{
    const arrCloned = [...pokemonList]
    const pokemonIndex = arrCloned.map( item => item.name).indexOf(name);
    return pokemonIndex;    
  }

  if (apiData.length <= 0 ) return null
  
  return (
    <div className='container'>
      <div className="overAll">
        <div className="header">
          <h1>Pokemon List</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
              Pokemon name: 
              <input type="text"  value={searchField} onChange={(e) => setSearchField(e.target.value)} />
            </label>
            <input type="submit" value="Search" />
            <button type='button' onClick={() => resetList()}>Reset</button>
          </form>

        </div>
        <div className="name">
          <div className="sectionTitle">
            <h4>Pokemon name</h4>
          </div>
          <ul>
            {
              pokemonList.map( (pokemon) => (
                <li key={pokemon.name} onClick={() => getDetails(pokemon.url)} >{`${pokemon.name}`}</li>
              ))
            }
          </ul>
        </div>
        <div className="image">
        <div className="sectionTitle">
        <h4>Pokemon image</h4>
        </div>
          <img src={details.img} alt={details.name}  />
        </div>
        <div className="actions">
          <div className="sectionTitle">
            <h4>Actions</h4>
          </div>
          <button onClick={() => deletePokemon(details.name)  } ><img src="https://img.icons8.com/ios7/12x/trash.png" alt="trash" /></button>
        </div>
      </div>
      <PokemonDetails details={details} />
    </div>
  );
}

export default App;
