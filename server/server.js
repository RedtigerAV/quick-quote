const express = require('express');
// const http = require('http');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const environment = process.env.NODE_ENV;
const app_folder = 'dist/quick-quote';

app.use(express.json());
// app.set('port', port);

if (environment === 'development') {
  const morgan = require('morgan');

  app.use(morgan('combined'));
}

app.use('/api/v1/quotes', require('./quotes/index'));
app.use('/api/v1/photos', require('./photos/index'));
app.use('/api/v1/mail-delivery', require('./mail-delivery/index'));

// ---- SERVE STATIC FILES ---- //
app.use(express.static(app_folder));

// ---- SERVE APLICATION PATHS ---- //
app.get('/*', (req, res) => res.sendFile(app_folder));

app.use((err, req, res, next) => {
  res.status(500).send('Internal error');
});

app.listen(port, () => {
  console.log(`...App is listening to port: ${port}`);
});

// http.createServer(app).listen(port, () => {
//   console.log(`...Listening to http://localhost:${port}`);
// });
