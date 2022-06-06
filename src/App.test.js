import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';


describe("<App/>", () =>{

  afterEach(() =>{
    cleanup();
  })
  
  test('render content', () => {
    const component = render(<App/>)
    component.debug();
    screen.findByText("Pokemon list");
  })

  test('match snapshot', ()=>{
    const container = render(<App/>);
    const input = container.findByLabelText("Search for a pokemon");
    console.log(input);
    const tree = renderer
    .create(<App/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});