const express = require('express');
const db = require('./db/index');
const router = express.Router();
const MEDIA_COLLECTION = 'media';

router.get('/', async (req, res) => {
  const count = req.query.count;
  const result = [];

  for (let i = 0; i < count; i++) {
    const media = await db.get(MEDIA_COLLECTION, undefined);

    result.push(media);
  }

  res.json(result);
});

module.exports = router;
