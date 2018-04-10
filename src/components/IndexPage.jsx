import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class IndexPage extends Component {
  /**
   *
   */
  constructor() {
    super();
    this.state = { files: [], loading: true };
  }

  /**
   *
   */
  componentWillMount() {
    fetch('/file')
      .then(response => response.json())
      .then(files => this.setState({ files }))
      .finally(() => this.setState({ loading: false }));
  }

  /**
   *
   */
  render() {
    return (
      <div>
        <h1>Index</h1>
        <ul>
          {this.state.loading ? (
            <li>Loading file list...</li>
          ) : (
            this.state.files.map(file => (<li key={file}><Link to={file}>{file}</Link></li>))
          )}
        </ul>

      </div>
    );
  }
}

export default IndexPage;
