import React from 'react';
import PropTypes from 'prop-types';
import ProjectListItem from './ProjectListItem';

const ProjectListContainer = ({ projects, isLoading, header }) => (
  <div className="card z-depth-1 border-0">
    <div className="card-header">{header}</div>
    <div className="card-body">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="list-group">
          {projects.map(project => (
            <ProjectListItem
              key={project.path}
              name={project.name}
              path={project.path}
              created={project.created}
            />
          ))}
        </div>
      )}
    </div>
  </div>
);

ProjectListContainer.propTypes = {
  header: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
  })),
};

ProjectListContainer.defaultProps = {
  header: 'Projects',
  projects: [],
};

export default ProjectListContainer;
