import express from 'express';
import {outputReportById} from '../public/javascripts/billdatabase.js';
const costRouter = express.Router();

/* GET home page for  specific user after login. */
//sending to report function with parameters and return it as json
//localhost:1030/cost/{id}
costRouter.get('/:id',async  function(req, res, next) {
    let outputResponse =  outputReportById(req.params.id,req.params.year,req.params.month);
    res.json(outputResponse);
});

//localhost:1030/cost/
costRouter.get('/',async  function(req, res, next) {
  let outputResponse =   outputReportById(req.params.id,req.params.year,req.params.month);
  res.json(outputResponse);
});

export default costRouter;
