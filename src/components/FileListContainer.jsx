import React from 'react';
import PropTypes from 'prop-types';
import FileListItem from './FileListItem';

const FileListContainer = ({ items, header, isLoading }) => (
  <div className="card z-depth-1 border-0">
    <div className="card-header">{header}</div>
    <div className="card-body">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="list-group">
          {items.map(item => (
            <FileListItem
              key={item.file}
              name={item.name}
              path={item.path}
              file={item.file}
              modified={item.modified}
            />
          ))}
        </div>
      )}
    </div>
  </div>
);

FileListContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  header: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    modified: PropTypes.number.isRequired,
  })),
};

FileListContainer.defaultProps = {
  header: 'File List',
  items: [],
};

export default FileListContainer;
