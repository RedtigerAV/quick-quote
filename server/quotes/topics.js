const express = require('express');
const { API_HOST, headers } = require('./config');
const axios = require('axios');
const router = express.Router();
const body = '{"language":"english"}';

const errorStatus = error => error.response?.status || 500;
const errorData = error => error.response?.data || { message: 'Quotel API internal error' };
const prepareTopic = topic => ({
  id: topic.id.toString(),
  name: topic.name
});

router.get('/', async (req, res) => {
  try {
    const response = await axios.post(`${API_HOST}/topics`, body, { headers });
    const result = response.data.map(topic => prepareTopic(topic));

    res.json(result);
  } catch (error) {
    res.status(errorStatus(error)).json(errorData(error));
  }
});

module.exports = router;
