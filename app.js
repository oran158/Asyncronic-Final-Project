//the main js file of the app
//start server here
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

app.use('/cost', costRouter);
app.use('/users',usersRouter);
app.get('', async (req, res) => {
    res.render('homepage');
});

//start the server that doesn't listen to client ger request
app.listen(app.get('port',''0.0.0.0'),async  function () {
    console.info('listening on port ' + app.get('port'));
  });

export default app;
// Yonatan Avizov | 318432101 , Oran Cohen | 208585877
