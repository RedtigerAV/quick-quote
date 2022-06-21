const path = require('path');
const environment = process.env.NODE_ENV;

if (environment === 'development') {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

module.exports = {
  USER: process.env.MAIL_DELIVERY_USER,
  PASSWORD: process.env.MAIL_DELIVERY_PASSWORD
};
