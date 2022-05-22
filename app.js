//the main js file of the app
//start server here
const port=1030;
host="localhost";
const createError = require('http-errors');
const express = require('express');
const path = require('path');
//const cookieParser = require('cookie-parser');
//const logger = require('morgan');
const costRouter = require('./routes/cost');
const usersRouter = require('./routes/users');

const app = express();
const bodyParser = require("express");
const http = require("http");
app.use(bodyParser.json());//data template of json
app.set('port',process.env.PORT||port);//whice port the app is going to listen
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//localhost:1030/?id=318
// localhost:1030/users/318/
app.use('/', costRouter);
app.use('/users', usersRouter);

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


const server = http.createServer(app);
const boot =  function () {
  server.listen(app.get('port'),async  function () {
 //start the server that doesn't listen to client ger request
    console.info('listening on port ' + app.get('port'));


  });
};
const shutdown = function () {
  server.close();
};
boot();

module.exports = app;