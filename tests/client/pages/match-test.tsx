/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import { Match } from '../../../src/client/pages/match';

it('should render quiz', async () => {
  const { debug } = render(<Match />);
  debug();
});
