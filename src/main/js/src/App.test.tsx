import React from 'react';
import {cleanup, render, waitForElement} from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('renders waiting', () => {
  const { getByText } = render(<App />);
  waitForElement(() => getByText(/Waiting.../i));
  const waiting = getByText(/Waiting.../i);
  expect(waiting).toBeInTheDocument();
});
