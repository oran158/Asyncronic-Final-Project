//the main js file of the app
//start server here

//28.5
//1. logic for user __put localhost:1030/318 will show user 318 page.
//2. logic for adding users - to do query.
//4.how to get url
//5. get right path to check the router to functions

import express from "express";
import usersRouter from './routes/users.js';
import costRouter from './routes/cost.js';


const app = express();
const port = 1030;

app.set('port',process.env.PORT||port);//which port the app is going to listen

// view engine setup
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static Files
app.use(express.static('public'));

app.use('/costs', costRouter);
app.use('/users',usersRouter);
app.get('', async (req, res) => {
    res.render('homepage', { title: 'Welcome to Cost Report App' })
});

app.listen(app.get('port'),async  function () {
 //start the server that doesn't listen to client ger request
    console.info('listening on port ' + app.get('port'));
  });

export default app;