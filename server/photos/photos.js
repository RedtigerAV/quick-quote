const axios = require('axios');
const express = require('express');
const router = express.Router();
const { API_HOST, headers } = require('./config');
const { readPhotosCache } = require('./helpers');
const use_cache = process.env.USE_CACHE;

// CONSTANTS
const SEARCH_QUERY = 'nature';
const IMAGES_COUNT = 30;
const DEFAULT_ORIENTATION = 'landscape';

// FUNCTIONS
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
  },
  user: {
    name: image.user.name,
    link: image.user.links.html
  },
  download_location: image.links.download_location
});

// ENPOINTS
router.get('/random', async (req, res) => {
  const orientation = req.query?.orientation || DEFAULT_ORIENTATION;
  const params = {
    orientation,
    count: IMAGES_COUNT,
    query: SEARCH_QUERY
  };

  if (use_cache === 'true') {
    const photos = await readPhotosCache();

    res.json(photos);

    return;
  }

  try {
    const response = await axios.get(`${API_HOST}/photos/random`, { headers, params });
    const result = response.data.map(image => prepareImage(image));

    res.json(result);
  } catch (error) {
    res.status(errorStatus(error)).json(errorData(error));
  }
});

router.post('/download', async (req, res) => {
  const { download_location } = req.body;

  if (!download_location) {
    res.status(500).json({ message: 'API should include download_location' });

    return;
  }

  try {
    // TODO: Несекрьюрно, можно подсунуть липовый download_location, и тем самым узнать что в headers
    const response = await axios.get(download_location, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(errorStatus(error)).json(errorData(error));
  }
});

module.exports = router;
