import React, { Component } from 'react';
import PropTypes from 'prop-types';
import url from 'url';

class StaticPage extends Component {
  constructor() {
    super();
    this.state = { html: '', loading: true, error: null };
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
      .finally(() => this.setState({ loading: false }));
  }

  /**
   *
   */
  getEndpoint() {
    const { pathname } = this.props.location;
    return `/file${pathname}.html`;
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
    if (this.state.loading) return (<div className="sandbox-loading">Loading...</div>);
    if (this.state.error) {
      return (<div className="sandbox-error">Error! {this.state.error}</div>);
    }
    // eslint-disable-next-line react/no-danger
    return (<div className="sandbox-html-result" dangerouslySetInnerHTML={this.createMarkup()} />);
  }
}

StaticPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default StaticPage;
