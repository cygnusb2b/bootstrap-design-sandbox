const path = require('path');
const express = require('express');
const utils = require('./utils');

const app = express();

const { PORT } = process.env

app.get('/projects', (req, res, next) => {
  utils.getProjects().then(projects => res.json(projects)).catch(next);
});

app.get('/files/:projectPath', (req, res, next) => {
  const { projectPath } = req.params;
  utils.getProjectItems(projectPath).then(items => res.json(items)).catch(next);
});

app.get('/file/:projectPath/:name.html', (req, res, next) => {
  const { projectPath, name } = req.params;
  const file = path.join(projectPath, 'pages', `${name}.html`);

  const options = { root: utils.getProjectRoot(), dotfiles: 'deny' };
  res.sendFile(file, options, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send(err.message);
    } else {
      console.info('Sent file:', file);
    }
  });
});

app.listen(PORT, () => {
  console.info(`Server listening on ${PORT}\n`);
});
