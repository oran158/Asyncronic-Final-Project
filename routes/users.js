import express from 'express';
import addUser, {addProduct, User} from "../public/javascripts/MangeBill.js";
import {outputReportById} from "../public/javascripts/billdatabase.js";
//add product to cost collection
const usersRouter = express.Router();
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
/* GET users listing. */


usersRouter.get('/',async function(req, res, next){
  console.log('home page loaded');
  res.render('report');
});
/* GET users listing. */
usersRouter.post('/login', async function (req, res, next) {
  const userID = req.body.username;
 let ar= await outputReportById(userID);


res.render('report',{title:userID,message:userID,info:ar.length.toString()});
});


export default usersRouter;
