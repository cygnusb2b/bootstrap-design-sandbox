import 'whatwg-fetch';
import 'bootstrap';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

/* eslint-disable react/jsx-filename-extension */
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('sandbox'),
);
// eslint-disable-next-line no-console
console.info('Sandbox initialized!');
