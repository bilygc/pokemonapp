import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, screen } from '@testing-library/react';
import PokemonDetails from './PokemonDetails';


describe("<PokemonDetails/>", () =>{
  let component;
  
  const details = {
        name: "metapod",
        url: "https://pokeapi.co/api/v2/pokemon/11/",
        abilities: [
            {
                ability: {
                    name: "shed-skin",
                    url: "https://pokeapi.co/api/v2/ability/61/"
                },
                is_hidden: false,
                slot: 1
            }
        ],
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png",
        type: [
            {
                slot: 1,
                type: {
                    name: "bug",
                    url: "https://pokeapi.co/api/v2/type/7/"
                }
            }
        ]
    }
  
  beforeEach(() =>{
    component = render(<PokemonDetails details={details} />)
  });

  afterEach(() =>{
    cleanup();
  })
  
  test('render content', () => {
    console.log(component);
    screen.findByText(/metapod/i);
  })
  
});