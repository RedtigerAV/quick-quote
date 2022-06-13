const express = require('express');
const router = express.Router();

router.use('/', require('./photos'));
// router.use('/topics', require('./topics'));

router.use((err, req, res, next) => {
  res.status(500).send('Photos API internal error');
});

module.exports = router;
