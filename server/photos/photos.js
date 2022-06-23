const axios = require('axios');
const express = require('express');
const router = express.Router();
const { API_HOST, headers, DEFAULT_TOPIC } = require('./config');
const { readPhotosCache } = require('./helpers');
const use_cache = process.env.USE_CACHE;

// CONSTANTS
const IMAGES_COUNT = 30;
const DEFAULT_ORIENTATION = 'landscape';

// FUNCTIONS
const errorStatus = error => error.response?.status || 500;
const errorData = error => error.response?.data?.errors || { message: 'Unsplash API internal error' };
const getIxidParam = download_location => {
  const paramsString = download_location.split('?')[1];
  const searchParams = new URLSearchParams(paramsString);

  return searchParams.get('ixid');
};
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
  ixid: getIxidParam(image.links.download_location)
});

// ENPOINTS
router.post('/random', async (req, res) => {
  const orientation = req.body?.orientation || DEFAULT_ORIENTATION;
  const rawTopics = req.body?.topics?.length ? req.body?.topics : [DEFAULT_TOPIC];
  const topics = rawTopics.toString();

  const params = {
    orientation,
    count: IMAGES_COUNT,
    topics: topics
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

router.post('/:id/download', async (req, res) => {
  const { ixid } = req.body;
  const { id } = req.params;

  if (!ixid || !id) {
    res.status(500).json({ message: 'API body should include ixid parameter' });

    return;
  }

  try {
    const response = await axios.get(`${API_HOST}/photos/${id}/download`, { headers, params: { ixid } });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(errorStatus(error)).json(errorData(error));
  }
});

module.exports = router;
