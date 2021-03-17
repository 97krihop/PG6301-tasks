/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../../../src/client/pages/not_found';
import { BrowserRouter } from 'react-router-dom';

it('should render home', () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
  screen.getByText('NOT FOUND: 404');
  screen.getByText('ERROR: the page you requested in not available.');
  screen.getByText('home');
});
