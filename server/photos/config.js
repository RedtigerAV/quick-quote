const path = require('path');
const environment = process.env.NODE_ENV;

if (environment === 'development') {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

module.exports = {
  API_HOST: 'https://api.unsplash.com',
  headers: {
    'content-type': 'application/json',
    'Accept-Version': 'v1',
    Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`
  },
  DEFAULT_TOPIC: process.env.PHOTOS_DEFAULT_TOPIC_KEY,
  IGNORED_TOPICS_SLUG: process.env.PHOTOS_IGNORED_TOPICS_SLUG
};
