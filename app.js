//the main js file of the app
//start server here

//28.5
//1. logic for user __put localhost:1030/318 will show user 318 page.
//2. logic for adding users - to do query.
//4.how to get url
//5. get right path to check the router to functions

import express from "express";
import path from 'path';
import usersRouter from './routes/users.js';
import costRouter from './routes/cost.js';
import http from "http";
import createError from 'http-errors';
import {fileURLToPath} from 'url';
import req from "express/lib/request.js";

const __filename = fileURLToPath(import.meta.url);
const app = express();
const port = 1030;

app.set('port',process.env.PORT||port);//whice port the app is going to listen
// view engine setup
app.set('views', path.dirname(__filename+'/views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.dirname(__filename+'/views')));

//localhost:1030/?id=318
app.use('/',usersRouter);

// localhost:1030/users/318/
//app.use('/user', costRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
//  next(createError(404));
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

export default app;