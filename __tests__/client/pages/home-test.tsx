/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from '../../../src/client/pages/home';
import { BrowserRouter } from 'react-router-dom';

it('should render home', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  screen.getByText('hello welcome to quiz game');
  screen.getByText('start game');
});

it('should ', function() {
  
}); 