import React from 'react';
import {cleanup, render, waitForElement} from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('given a new app, when the app loads, it asks the user to start or join a game', async () => {
  const { getByText } = render(<App/>);
  const element = await waitForElement(() => getByText(/Start new game/i));
  expect(element).toBeInTheDocument();
});
