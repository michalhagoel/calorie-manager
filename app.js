// Omer Sharoni, 206914384
// Michal Hagoel, 318662830

// Express.js
const express = require('express');
const app = express();

// Dependencies
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Routes
const aboutRouter = require('./routes/about');
const caloriesRouter = require('./routes/calories');
const reportRouter = require('./routes/report');

// Mongo
const mongoose = require('mongoose');
const mongoUrl = 'mongodb://127.0.0.1:27017/calories-manager';
mongoose.connect(mongoUrl, { directConnection: true })
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// App middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// App routes
app.use('/', aboutRouter);
app.use('/', caloriesRouter);
app.use('/', reportRouter);

// App listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});