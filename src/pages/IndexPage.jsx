import React, { Component } from 'react';
import ProjectListContainer from '../components/ProjectListContainer';

class IndexPage extends Component {
  constructor() {
    super();
    this.state = { projects: [], isLoading: true };
  }

  componentWillMount() {
    fetch('/projects')
      .then(response => response.json())
      .then(projects => this.setState({ projects }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    return (
      <ProjectListContainer projects={this.state.projects} isLoading={this.state.isLoading} />
    );
  }
}

export default IndexPage;
