import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <div>
    <h1>Oops.</h1>
    <h2>This page is not handled by the sandbox</h2>
    <hr />
    <p><Link to="/">Go Back Home</Link></p>
  </div>
);

export default ErrorPage;
