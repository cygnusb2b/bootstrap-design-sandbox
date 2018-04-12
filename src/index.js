import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import ErrorAlert from './components/ErrorAlert';
import IndexPage from './pages/IndexPage';

import './vendor.scss';

/* eslint-disable react/jsx-filename-extension */
render(
  <BrowserRouter>
    <Container>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route render={() => (
          <ErrorAlert message="This page is not handled by the sandbox." go={{ to: '/', label: 'the project list' }} />
        )}
        />
      </Switch>
    </Container>
  </BrowserRouter>,
  document.getElementById('sandbox'),
);
// eslint-disable-next-line no-console
console.info('Core application wrapper loaded.');
