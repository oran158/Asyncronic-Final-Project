import express from 'express';

const costRouter = express.Router();
const answer = 'answer from request id function';

/* GET home page for  specific user after login. */

costRouter.get('/user/:id',async  function(req, res, next) {
  const memberDetails = {
    title:'My cost list ',
    member:answer,
  }
  res.render('layout', memberDetails);

});

export default costRouter;
