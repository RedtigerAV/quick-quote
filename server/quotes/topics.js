const express = require('express');
const { API_HOST, headers } = require('./config');
const axios = require('axios');
const router = express.Router();
const body = '{"language":"english"}';

router.get('/', async (req, res) => {
  try {
    const response = await axios.post(`${API_HOST}/topics`, body, { headers });

    res.json(response.data);
  } catch (error) {
    console.error(err);
  }
});

module.exports = router;
