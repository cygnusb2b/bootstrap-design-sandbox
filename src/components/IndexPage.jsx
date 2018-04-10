import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => (
  <div>
    <h1>Index</h1>
    <p><Link to="/test">test</Link></p>
  </div>
);

export default IndexPage;
