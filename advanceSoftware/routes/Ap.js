const express = require('express');
const loginRouter = require ('./login');
const signupRouter = require('./signup');
const resourcesRouter = require('./APIs/Resources');
const app = express();
const port = 5000;

// Use the login router for requests to /login
app.use('/login', loginRouter);
app.use('/API/Resources', resourcesRouter);

// Use the signup router for requests to /signup
app.use('/signup', signupRouter);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
