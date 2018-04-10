import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IndexPage from './IndexPage';
import LoadFromServer from './LoadFromServer';

const App = () => (
  <Switch>
    <Route exact path="/" component={IndexPage} />
    <Route component={LoadFromServer} />
  </Switch>
);

export default App;
