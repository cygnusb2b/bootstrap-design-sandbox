import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IndexPage from './IndexPage';
import StaticPage from './StaticPage';
import ErrorPage from './ErrorPage';

const App = () => (
  <Switch>
    <Route exact path="/" component={IndexPage} />
    <Route exact path="/:filename" component={StaticPage} />
    <Route component={ErrorPage} />
  </Switch>
);

export default App;
