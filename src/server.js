const path = require('path');
const express = require('express');

const app = express();

const { PORT } = process.env

app.get('/file/*', (req, res, next) => {
  const options = {
    root: path.resolve(__dirname, 'html'),
    dotfiles: 'deny',
  };
  const file = req.params[0];

  res.sendFile(file, options, (err) => {
    if (err) {
      console.error(err);
      next(err);
    } else {
      console.info('Sent:', file);
    }
  });
});

app.listen(PORT, () => {
  console.info(`Server listening on ${PORT}\n`);
});
