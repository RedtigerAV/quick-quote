const express = require('express');
const router = express.Router();

router.use('/topics', require('./topics'));
router.use('/', require('./quotes'));

router.use((err, req, res, next) => {
  res.status(500).send('Quotes API internal error');
});

module.exports = router;
