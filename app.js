var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { parseSqlFile, initDatabase } = require('./database/databaseInit');
const youtubeRoute = require('./routes/get_data_from_youtube').router;
const fetchAllResultsRoute = require('./routes/fetch_results').router;
const fetchAllResultByIdRoute = require('./routes/fetch_result_by_id').router;
const deleteDataByIdRoute = require('./routes/delete_data_by_id').router;
const fetchByFilterRoute = require('./routes/fetch_by_title_containing').router;
require('dotenv').config();

var app = express();

// Add a connect to database here
parseSqlFile();
initDatabase();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add routes here
app.use('/youtube_data', youtubeRoute);
app.use('/results', fetchAllResultsRoute);
app.use('/fetch_result_by_id', fetchAllResultByIdRoute);
app.use('/delete_data_by_id', deleteDataByIdRoute);
app.use('/fetch_by_term', fetchByFilterRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
