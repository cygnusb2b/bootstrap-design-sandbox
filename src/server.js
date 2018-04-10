const path = require('path');
const express = require('express');

const { resolve } = path;

const app = express();

const { PORT } = process.env

app.get('/file/*', (req, res, next) => {
  const root = resolve(__dirname, 'html')
  const options = { root, dotfiles: 'deny' };
  const file = req.params[0];

  res.sendFile(file, options, (err) => {
    if (err) {
      console.error(err);
      next(err);
    } else {
      console.info('Sent file:', resolve(root, file));
    }
  });
});

app.listen(PORT, () => {
  console.info(`Server listening on ${PORT}\n`);
});
