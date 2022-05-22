var express = require('express');
var router = express.Router();
var answer = 'answer from request id function';

/* GET home page for  specific user after login. */

router.get('/user/:id',async  function(req, res, next) {
  const memberDetails = {
    title:'My cost list ',
    member:answer,
  }
  res.render('layout', memberDetails);

});

module.exports = router;
