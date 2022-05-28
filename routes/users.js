//import {addUser, User} from "../public/javascripts/MangeBill";

const {User} = require("../public/javascripts/MangeBill");
const {addUser} = require("../public/javascripts/MangeBill");

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', async function(req, res, next) {
  const user = new User(313, 'Adi', 'O.z', 324528, 'single');
  await addUser(user);
  console.log('User has been added');
  res.send('User has been added');
});

module.exports = router;
