import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../components/Container';
import FileListContainer from '../components/FileListContainer';

class ProjectIndexPage extends Component {
  constructor() {
    super();
    this.state = { fileList: [], isLoading: true };
  }

  componentWillMount() {
    fetch(`/files/${this.props.projectPath}`)
      .then(response => response.json())
      .then(fileList => this.setState({ fileList }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    return (
      <Container>
        <FileListContainer items={this.state.fileList} isLoading={this.state.isLoading} />
      </Container>
    );
  }
}

ProjectIndexPage.propTypes = {
  projectPath: PropTypes.string.isRequired,
};

export default ProjectIndexPage;
