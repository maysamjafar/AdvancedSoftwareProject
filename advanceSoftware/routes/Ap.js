// app.js
const express = require('express');
const app = express();
const port = 5000;

// Import the MySQL connection
const db = require('./db');

// Middleware for parsing JSON in requests
app.use(express.json());

// Import the login and signup routes
const loginRoute = require('./login');
const signupRoute = require('./signup');

// Use the routes
app.use('/login', loginRoute(db));
app.use('/signup', signupRoute(db));

// Default route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
