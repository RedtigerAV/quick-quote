const express = require('express');
const db = require('./db/index');
const router = express.Router();
const MEDIA_COLLECTION = 'media';

router.get('/', async (req, res) => {
  const media = await db.get(MEDIA_COLLECTION, undefined);

  res.json(media);
});

module.exports = router;
