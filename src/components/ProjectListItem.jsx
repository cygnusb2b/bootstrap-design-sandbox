import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const ProjectListItem = ({
  name,
  path,
  created,
}) => (
  <a className="list-group-item list-group-item-action flex-column align-items-start" href={path}>
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{name}</h5>
      <small className="text-muted" title={moment(created).format('MM/DD/YYYY h:mm:ss A')}>
        {moment(created).fromNow()}
      </small>
    </div>
    <small>{path}</small>
  </a>
);

ProjectListItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired,
};

export default ProjectListItem;
