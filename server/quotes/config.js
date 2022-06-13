const path = require('path');
const environment = process.env.NODE_ENV;

if (environment === 'development') {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

module.exports = {
  API_HOST: 'https://quotel-quotes.p.rapidapi.com',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Host': 'quotel-quotes.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.RAPID_API_KEY
  }
};
