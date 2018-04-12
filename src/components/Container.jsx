import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => (
  <div className="container my-3">
    <div className="row">
      <div className="col-lg-6 col-xl-8 mx-auto">
        {children}
      </div>
    </div>
  </div>
);

Container.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Container;
