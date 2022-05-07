const express = require('express');
const db = require('./db/index');
const router = express.Router();
const QUOTES_COLLECTION = 'quotes';

router.get('/random', async (req, res) => {
  const quote = await db.get(QUOTES_COLLECTION, undefined);

  res.json(quote);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const quote = await db.get(QUOTES_COLLECTION, id);

    res.json(quote);
  } catch (err) {
    if (err.code === db.NO_ENTITY) {
      res.status(404).send(`Unknown quote id: ${id}`);

      return;
    }

    throw err;
  }
});

module.exports = router;
