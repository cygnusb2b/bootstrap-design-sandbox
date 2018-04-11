const path = require('path');
const fs = require('fs');
const express = require('express');
const moment = require('moment');
const inflected = require('inflected');

const { resolve, extname, basename } = path;

const app = express();

const { PORT } = process.env
const root = resolve(__dirname, '../public/html');

const getFileInfo = (file) => {
  const path = basename(file, extname(file));
  const name = inflected.titleize(path);
  const filepath = resolve(root, file);
  return new Promise((resolve, reject) => {
    fs.stat(filepath, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        const mtime = stats.mtime.getTime();
        resolve({ name, path, file, mtime });
      }
    });
  });
};

const getFileList = (files) => {
  const filtered = files.filter(file => extname(file) === '.html');
  return Promise.all(filtered.map(file => getFileInfo(file)));
};


app.get('/file', (req, res, next) => {
  fs.readdir(root, (err, files) => {
    if (err) {
      next(err);
    } else {
      getFileList(files).then((list) => {
        console.info('File list:', list);
        res.json(list);
      }).catch(next);
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
