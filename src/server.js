const express = require('express');

const app = express();

const { PORT } = process.env

app.get('/file', (req, res) => {
  res.send('This is the server!');
});

app.listen(PORT, () => {
  console.info(`Server listening on ${PORT}\n`);
});
