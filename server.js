require('dotenv').config(); // read .env files
const express = require('express');
var jsonServer = require('json-server');
// var middlewares  = jsonServer.defaults();

const app = express();
const port = process.env.PORT || 3000;

// app.use(middlewares);
app.use(express.static('public'));
app.use('/scripts', express.static(`${__dirname}/node_modules/`));
app.use('/api', jsonServer.router('db.json'));
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));
app.listen(port, () => {
  console.log('listening on %d', port);
});