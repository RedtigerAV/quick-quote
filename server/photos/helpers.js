const fs = require('fs/promises');
const path = require('path');

const CACHE_FILE_PATH = path.join(__dirname, 'photos.cache.json');

async function readPhotosCache() {
  try {
    const cache = await fs.readFile(CACHE_FILE_PATH, 'utf8');
    const photos = shuffleArray(JSON.parse(cache));

    return photos;
  } catch (error) {
    return {};
  }
}

function shuffleArray(array) {
  return array.sort(() => 0.5 - Math.random());
}

module.exports = {
  readPhotosCache
};
