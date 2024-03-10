const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

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
        res.json({ message: 'Sign up successful' });
      }
    );
  });
});

module.exports = router