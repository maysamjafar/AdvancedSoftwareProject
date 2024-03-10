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

// Sign-in endpoint
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  // Check if username exists in the database
  connection.query('SELECT * FROM user_profile WHERE username = ? AND password=?', [username,password], async (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password1' });
    }
    // If both username and password are correct, sign in successful
    res.json({ message: 'Sign in successful' });
  });
});

module.exports = router;