const path = require('path');
const fs = require('fs');
const express = require('express');

const { resolve, extname, basename } = path;

const app = express();

const { PORT } = process.env
const root = resolve(__dirname, '../public/html');


app.get('/file', (req, res, next) => {
  fs.readdir(root, (err, files) => {
    if (err) {
      next(err);
    } else {
      const names = files.filter(file => extname(file) === '.html').map(file => basename(file, '.html'));
      console.info('File name list:', names);
      res.json(names);
    }
  });
});

app.get('/file/:name.html', (req, res, next) => {
  const file = `${req.params.name}.html`;
  const options = { root, dotfiles: 'deny' };

  res.sendFile(file, options, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send(err.message);
    } else {
      console.info('Sent file:', resolve(root, file));
    }
  });
});

app.listen(PORT, () => {
  console.info(`Server listening on ${PORT}\n`);
});
