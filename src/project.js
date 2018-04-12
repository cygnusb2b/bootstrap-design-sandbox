import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProjectIndexPage from './pages/ProjectIndexPage';
import StaticPage from './pages/StaticPage';
import Container from './components/Container';
import ErrorAlert from './components/ErrorAlert';

const { pathname } = window.location;
const projectPath = pathname.replace('/', '').split('/').shift();
const basename = `/${projectPath}`;

/* eslint-disable react/jsx-filename-extension */
render(
  <BrowserRouter basename={basename}>
    <Switch>
      <Route exact path="/" render={() => <ProjectIndexPage projectPath={projectPath} />} />
      <Route exact path="/:filename" render={props => <StaticPage projectPath={projectPath} {...props} />} />
      <Route render={() => (
        <Container>
          <ErrorAlert message="Subfolders for HTML files are currently not supported." go={{ to: '/', label: 'the project file list' }} />
        </Container>
      )}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById('sandbox'),
);
// eslint-disable-next-line no-console
console.info('Project application wrapper loaded.');
