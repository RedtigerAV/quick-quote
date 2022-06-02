const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const express = require('express');
const router = express.Router();

require('dotenv').config({ path: path.join(__dirname, '.env') });

const CACHE_FILE_PATH = path.join(__dirname, 'media.cache.json');
let CACHE_EXPIRES_MINUTES = 15;

if ((process.env.NODE_ENV = 'development')) {
  CACHE_EXPIRES_MINUTES = 60;
}

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
  },
  user: {
    name: image.user.name,
    link: image.user.links.html
  }
});

async function readMediaCache() {
  try {
    const cache = await fs.readFile(CACHE_FILE_PATH, 'utf8');

    return JSON.parse(cache);
  } catch (error) {
    return {};
  }
}

function isCacheValid(cache, orientation) {
  const currentDate = new Date();
  const cacheByOrientation = cache[orientation];
  const cachedImages = cacheByOrientation?.images;
  const expiresAt = cacheByOrientation?.expiresAt;
  const expiresAtIsDate = !Number.isNaN(Date.parse(expiresAt));

  if (cacheByOrientation && cachedImages.length === IMAGES_COUNT && expiresAtIsDate) {
    const expiresAtDate = new Date(expiresAt);

    if (currentDate < expiresAtDate) {
      return true;
    }
  }

  return false;
}

function getCachedImages(cache, orientation) {
  const cacheByOrientation = cache[orientation];

  return cacheByOrientation?.images;
}

async function writeMediaCache(cache, images, orientation) {
  try {
    const date = new Date();

    date.setMinutes(date.getMinutes() + CACHE_EXPIRES_MINUTES);

    const resultCache = {
      ...cache,
      [orientation]: {
        images,
        expiresAt: date.toUTCString()
      }
    };
    const stringifiedCache = JSON.stringify(resultCache);

    await fs.writeFile(CACHE_FILE_PATH, stringifiedCache, 'utf8');
  } catch (error) {
    console.error('Can not write cache: ', error);
  }
}

function shuffleArray(array) {
  return array.sort(() => 0.5 - Math.random());
}

router.get('/', async (req, res) => {
  const orientation = req.query?.orientation || DEFAULT_ORIENTATION;
  const params = {
    orientation,
    count: IMAGES_COUNT,
    query: SEARCH_QUERY
  };
  const cache = await readMediaCache();

  if (isCacheValid(cache, orientation)) {
    const cachedImages = getCachedImages(cache, orientation);
    const result = shuffleArray(cachedImages);

    res.json(result);

    return;
  }

  try {
    const response = await axios.get(`${API_HOST}/photos/random`, { headers, params });
    const result = response.data.map(image => prepareImage(image));

    await writeMediaCache(cache, result, orientation);

    res.json(result);
  } catch (error) {
    res.status(errorStatus(error)).json(errorData(error));
  }
});

module.exports = router;
