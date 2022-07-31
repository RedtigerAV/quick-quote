const express = require('express');
const http = require('http');
const path = require('path');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 8080;
const environment = process.env.NODE_ENV;
const app_folder = 'dist/quick-quote';

app.use(express.json());
app.use(compression());

if (environment === 'development') {
  const morgan = require('morgan');

  app.use(morgan('combined'));
}

if (environment === 'production') {
  app.enable('trust proxy');
  app.use(function (req, res, next) {
    if (req.secure) {
      // https request, nothing to handle
      next();
    } else {
      // this is an http request, redirect to https
      res.redirect(301, 'https://' + req.headers.host + req.url);
    }
  });
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

// For tests purpose only
// http.createServer(app).listen(port, () => {
//   console.log(`...Listening to http://localhost:${port}`);
// });
