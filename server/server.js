const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV;

app.use(express.json());

if (environment === 'development') {
  app.use(morgan('combined'));
}

app.use('/api/v1/quotes', require('./quotes/index'));
app.use('/api/v1/photos', require('./photos/index'));

app.use((err, req, res, next) => {
  res.status(500).send('Internal error');
});

app.listen(port, () => {
  console.log(`...Listening to http://localhost:${port}`);
});
