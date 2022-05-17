const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV;

app.use(express.json());

if (environment === 'development') {
  app.use(cors());
  app.use(morgan('combined'));
}

app.use('/api/v1/quotes', require('./quotes'));
app.use('/api/v1/media', require('./media'));

app.use((err, req, res, next) => {
  res.status(500).send('Internal error');
});

app.listen(port, () => {
  console.log(`...Listening to http://localhost:${port}`);
});
