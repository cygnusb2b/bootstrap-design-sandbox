import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IndexPage from './IndexPage';
import StaticPage from './StaticPage';

const App = () => (
  <Switch>
    <Route exact path="/" component={IndexPage} />
    <Route component={StaticPage} />
  </Switch>
);

export default App;
