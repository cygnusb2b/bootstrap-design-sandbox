import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ErrorAlert = ({ heading, message, go }) => (
  <div className="alert alert-warning" role="alert">
    <h4 className="alert-heading">{heading}</h4>
    <p>{message}</p>
    <hr />
    <p className="mb-0">Return to <Link className="alert-link" to={go.to}>{go.label}</Link>.</p>
  </div>
);

ErrorAlert.propTypes = {
  heading: PropTypes.string,
  message: PropTypes.string.isRequired,
  go: PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
};

ErrorAlert.defaultProps = {
  heading: 'Oops!',
  go: {
    to: '/',
    label: 'list',
  },
};

export default ErrorAlert;

