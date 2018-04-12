import React, { Component } from 'react';
import PropTypes from 'prop-types';
import url from 'url';
import Container from '../components/Container';
import ErrorAlert from '../components/ErrorAlert';

class StaticPage extends Component {
  constructor() {
    super();
    this.state = { html: '', isLoading: true, error: null };
  }

  /**
   *
   */
  componentWillMount() {
    fetch(this.getEndpoint()).then((response) => {
      if (!response.ok) {
        const { pathname } = url.parse(response.url);
        throw new Error(`${response.status} ${response.statusText}: ${pathname}`);
      }
      return response.text();
    }).then(html => this.setState({ html }))
      .catch(e => this.setState({ error: e.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  /**
   *
   */
  getEndpoint() {
    const { filename } = this.props.match.params;
    return `/file/${this.props.projectPath}/${filename}.html`;
  }

  /**
   *
   */
  createMarkup() {
    return { __html: this.state.html };
  }

  /**
   *
   */
  render() {
    if (this.state.isLoading) return (<div className="sandbox-isLoading">Loading...</div>);
    if (this.state.error) {
      return (
        <Container>
          <ErrorAlert message={this.state.error} go={{ to: '/', label: 'the project file list' }} />
        </Container>
      );
    }
    // eslint-disable-next-line react/no-danger
    return (<div className="sandbox-html-result" dangerouslySetInnerHTML={this.createMarkup()} />);
  }
}

StaticPage.propTypes = {
  projectPath: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      filename: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default StaticPage;
