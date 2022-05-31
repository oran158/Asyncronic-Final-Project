import express from 'express';
import {outputReportById} from '../public/javascripts/billdatabase.js';
//output report
const costRouter = express.Router();
const answer = 'answer from request id function';

/* GET home page for  specific user after login. */
//sending to report function with parameters and return it as json
costRouter.get('/user/:id',async  function(req, res, next) {
  try {
    let outputResponse = outputReportById(req.params.id,req.params.year,req.params.month);
    res.json(outputResponse);
  }
  catch (e)
  {
    if (e)
    {
      res.status(404);
    }
  }

});

export default costRouter;
