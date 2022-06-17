const axios = require('axios');
const express = require('express');
const router = express.Router();
const { API_HOST, headers, IGNORED_TOPICS_SLUG } = require('./config');

// CONSTANTS
const PAGE = 1;
const PER_PAGE = 50; // max amount of unsplash topics
const ignoredSlugs = IGNORED_TOPICS_SLUG.split(',');

// FUNCTIONS
const errorStatus = error => error.response?.status || 500;
const errorData = error => error.response?.data?.errors || { message: 'Unsplash API internal error' };
const prepareTopic = topic => ({
  id: topic.id,
  name: topic.title,
  slug: topic.slug
});

// ENDPOINTS
router.get('/', async (req, res) => {
  const params = {
    page: PAGE,
    per_page: PER_PAGE
  };

  try {
    const response = await axios.get(`${API_HOST}/topics`, { headers, params });
    const result = response.data.map(image => prepareTopic(image));
    const filteredResult = result.filter(({ slug }) => !ignoredSlugs.includes(slug));

    res.json(filteredResult);
  } catch (error) {
    res.status(errorStatus(error)).json(errorData(error));
  }
});

module.exports = router;
