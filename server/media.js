const path = require('path');
const axios = require('axios');
const express = require('express');
const router = express.Router();

require('dotenv').config({ path: path.join(__dirname, '.env') });

const SEARCH_QUERY = 'nature';
const IMAGES_COUNT = 30;
const DEFAULT_ORIENTATION = 'landscape';
const API_HOST = 'https://api.unsplash.com';
const headers = {
  'content-type': 'application/json',
  'Accept-Version': 'v1',
  Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`
};
const errorStatus = error => error.response?.status || 500;
const errorData = error => error.response?.data?.errors || { message: 'Unsplash API internal error' };
const prepareImage = image => ({
  id: image.id,
  color: image.color,
  blur_hash: image.blur_hash,
  urls: {
    raw: image.urls.raw,
    full: image.urls.full,
    regular: image.urls.regular,
    small: image.urls.small,
    thumb: image.urls.thumb,
    small_s3: image.urls.small_s3
  }
});

router.get('/', async (req, res) => {
  const orientation = req.query?.orientation || DEFAULT_ORIENTATION;
  const params = {
    orientation,
    count: IMAGES_COUNT,
    query: SEARCH_QUERY
  };

  try {
    const response = await axios.get(`${API_HOST}/photos/random`, { headers, params });
    const result = response.data.map(image => prepareImage(image));

    res.json(result);
  } catch (error) {
    res.status(errorStatus(error)).json(errorData(error));
  }
});

module.exports = router;
