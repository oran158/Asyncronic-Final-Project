import express from 'express';
import addUser, {addProduct, Product, User} from "../public/javascripts/MangeBill.js";
import {outputReportById} from "../public/javascripts/billdatabase.js";
//add product to cost collection
const usersRouter = express.Router();
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
let userID = 0;

/* POST users listing. */
usersRouter.post('/login', async function (req, res, next) {
  userID = parseInt(req.body.username);
  let ar = await outputReportById(userID);
  res.render('userPage',{title:userID,message:userID,info:JSON. stringify(ar)});
});

usersRouter.post('/login/addProduct',async function(req, res, next){
  console.log('user page');
  let name = req.body.name;
  let sum = parseInt(req.body.sum);
  let cate = req.body.cate;
  let des = req.body.des;
  let prod = new Product(userID,name,sum,cate,date,des);
  await addProduct(prod);
  res.render('alertAddProduct',{title:'User ' + userID,message:'Product has been added for ' + userID,info:prod.msg});
});

usersRouter.post('/login/report',async function(req, res, next){
  console.log('user page');
  let year = req.body.year;
  let month = req.body.month;
  let ar = await outputReportById(userID,year,month);
  let mes = 'Report for ' + userID + 'date ' + year + ' ' + month;
  res.render('dateReport',{title:'Report for '+ userID,message:mes,info:JSON. stringify(ar)});
});

export default usersRouter;