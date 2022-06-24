import express from 'express';
import {outputReportById} from '../public/javascripts/billdatabase.js';
import {addProduct, getTotalSum, Product} from "../public/javascripts/MangeBill.js";
import usersRouter from "./users.js";
const costRouter = express.Router();
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
let userID = 0;

//getting username and id number => calling for output report => return  the report
usersRouter.post('/login', async function (req, res, next) {
    userID = parseInt(req.body.id);
    let ar = await outputReportById(userID);
    let sum= await getTotalSum(userID);
    res.render('userPage',{title:userID,message:userID,info:ar,total_cost:sum});
});

//getting from the page all the details of the product => calling to add product function => return of succeed message
usersRouter.post('/login/addProduct',async function(req, res, next){
    console.log('user page - add product');
    let name = req.body.name;
    let sum = parseInt(req.body.sum);
    let cate = req.body.cate;
    let des = req.body.des;
    let prod = new Product(userID,name,sum,cate,date,des);
    let info = 'Product (name: ' + name + ', description: ' + des + ') has been added for ' + userID;
    await addProduct(prod);
    res.render('alertAddProduct',{title:'User ' + userID,message:'User ' + userID,info:info});
});

//getting the year and the month for the report =>send the details to the function => return  the report
usersRouter.post('/login/report',async function(req, res, next){
    console.log('user page - report');
    let year = req.body.year;
    let month = req.body.month;
    let ar = await outputReportById(userID,year,month);
    let mes = 'Report for '+' '+ userID +' '+ 'date ' +' '+ year + '/' + month;
    res.render('dateReport',{title:'Report for '+ userID,message:mes,info:ar});
});


export default costRouter;
