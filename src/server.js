const path = require('path');
const express = require('express');

const { resolve } = path;

const app = express();

const { PORT } = process.env

app.get('/file/:name.html', (req, res, next) => {
  const root = resolve(__dirname, '../public/html');
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
