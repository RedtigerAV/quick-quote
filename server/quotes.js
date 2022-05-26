const express = require('express');
const path = require('path');
const axios = require('axios');
const router = express.Router();

require('dotenv').config({ path: path.join(__dirname, '.env') });

const API_HOST = 'https://quotel-quotes.p.rapidapi.com';
const headers = {
  'content-type': 'application/json',
  'X-RapidAPI-Host': 'quotel-quotes.p.rapidapi.com',
  'X-RapidAPI-Key': process.env.RAPID_API_KEY
};
const errorStatus = error => error.response?.status || 500;
const errorData = error => error.response?.data || { message: 'Quote API internal error' };
const prepareQuote = quote => ({
  id: quote.quoteId.toString(),
  quote: quote.quote,
  authorId: quote.authorId,
  authorName: quote.name,
  authorProfession: quote.profession,
  authorNationality: quote.nationality,
  authorBorn: quote.born,
  authorDied: quote.died
});

router.get('/random', async (req, res) => {
  try {
    const response = await axios.post(`${API_HOST}/quotes/random`, {}, { headers });

    res.json(prepareQuote(response.data));
  } catch (error) {
    res.status(errorStatus(error)).json(errorData(error));
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const body = JSON.stringify({ ids: [id] });

  try {
    const response = await axios.post(`${API_HOST}/quotes`, body, { headers });
    const result = response.data[0];

    res.json(prepareQuote(result));
  } catch (error) {
    res.status(errorStatus(error)).json(errorData(error));
  }
});

router.post('/', async (req, res) => {
  const ids = req.body?.ids;

  if (!ids || !ids.length) {
    res.json([]);

    return;
  }

  const body = JSON.stringify({ ids: ids.map(id => Number(id)) });

  try {
    const response = await axios.post(`${API_HOST}/quotes`, body, { headers });
    const result = response.data.map(quote => prepareQuote(quote));

    res.json(result);
  } catch (error) {
    res.status(errorStatus(error)).json(errorData(error));
  }
});

module.exports = router;
