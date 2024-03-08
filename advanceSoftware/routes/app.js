const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
//const datacollection = require('./datacollection');
//const report = require('./report');
//const educationalResourcesRouter = require('./educationalResourcesRouter');
//const userprofile = require('./userprofile');
//const enviromentalart = require('./enviromentalart');
const login = require('./login');
const signup = require('./signup');
//const weather = require('./externalapi');

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./index');
var usersRouter = require('./users');

const app = express();
const port = process.env.PORT || 5000;

// MySQL configuration
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'advance'
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use express-session middleware
app.use(
  session({
    secret: '1234567',
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use express-session middleware
app.use(
  session({
    secret: '1234567',
    resave: false,
    saveUninitialized: true
  })
);
// Middleware to simulate user authentication
const authenticateUser = (req, res, next) => {
  // Assuming you have some way to determine if a user is logged in
  if (req.session && req.session.isAuthenticated) {
    return next();
  } else {
    res.redirect('/login');
  }
};
app.use('/login', login(pool));
app.use('/signup', signup(pool));
app.use('*', (req, res) => res.send({ message: 'Invalid endpoint.' }));

app.listen(port, () => console.log('Listening on port${port}'));

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;