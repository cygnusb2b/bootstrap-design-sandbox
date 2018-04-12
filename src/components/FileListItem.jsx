import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const FileListItem = ({
  name,
  path,
  file,
  modified,
}) => (
  <Link className="list-group-item list-group-item-action" to={`/${path}`}>
    {name} ({file})&nbsp;
    <small className="text-muted" title={moment(modified).format('MM/DD/YYYY h:mm:ss A')}>
      {moment(modified).fromNow()}
    </small>
  </Link>
);

FileListItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  modified: PropTypes.number.isRequired,
};

export default FileListItem;
