const express = require('express');
const loginRouter = require('./login');
const signupRouter = require('./signup');

const app = express();
const port = 5000;

// Use the login router for requests to /login
app.use('/login', loginRouter);

// Use the signup router for requests to /signup
app.use('/signup', signupRouter);
app.listen(port, () => {
  console.log('Server running on port ${port}');
});
