import React, { Component } from 'react';
import FileListContainer from './FileListContainer';

class IndexPage extends Component {
  /**
   *
   */
  constructor() {
    super();
    this.state = { fileList: [], loading: true };
  }

  /**
   *
   */
  componentWillMount() {
    fetch('/file')
      .then(response => response.json())
      .then(fileList => this.setState({ fileList }))
      .finally(() => this.setState({ loading: false }));
  }

  /**
   *
   */
  render() {
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-lg-6 col-xl-8 mx-auto">
            <FileListContainer items={this.state.fileList} isLoading={this.state.loading} />
          </div>
        </div>
      </div>
    );
  }
}

export default IndexPage;
