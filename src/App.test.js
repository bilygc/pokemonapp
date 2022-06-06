import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App';


describe("<App/>", () =>{
  let component;
  
  beforeEach(() =>{
    component = render(<App/>)
  });

  afterEach(() =>{
    cleanup();
  })
  
  test('render content', () => {
    console.log(component);
    screen.findByText("Pokemon list");
  })
  
});