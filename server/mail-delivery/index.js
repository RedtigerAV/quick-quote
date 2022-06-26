const axios = require('axios');
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const { USER, PASSWORD } = require('./config');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: USER,
    pass: PASSWORD
  }
});

router.post('/send', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: USER,
      subject,
      text: message
    });

    res.sendStatus(204);
  } catch (error) {
    res.setStatus(500).json({ message: 'The email was not sent' });
  }
});

module.exports = router;
