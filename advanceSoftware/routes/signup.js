const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'advance'
});
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ruahuwari@gmail.com",
    pass: "wumndvgkltfmjkdd",
  },
});
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Sign-up endpoint
router.post('/', async (req, res) => {
  const { username, email, password, craft_skills, craft_interests } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if username already exists
  connection.query('SELECT * FROM user_profile WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Insert new user into the database
    connection.query(
      'INSERT INTO user_profile (username, email, password, craft_skills, craft_interests, created_at, updated_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      [username, email, hashedPassword, craft_skills, craft_interests],
      (err, results) => {
        if (err) {
          console.error('Error inserting into MySQL:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
        // Send welcome email to the user
        transporter.sendMail({
          from: 'maysam.jafar@2001@gmail.com',
          to: email,
          subject: 'Welcome to Our Application',
          text: `Hello ${username},\n\nWelcome to our application! You have successfully signed up.\n\nRegards,\nThe Team`
        }, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            // Handle error
          } else {
            console.log('Email sent:', info.response);
            // Handle success
          }
        });
        res.json({ message: 'Sign up successful' });
      }
    );
  });
});

module.exports = router;