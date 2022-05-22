/*
To do 15-5:
1. Display get inputs from by id function (do this with async.then() => ()) - V
2. Return proper input with HTML. - V
3. Inside HTML parse information for display in.
*/

const http =require("http");
const  url =require("url");
const {MongoClient} = require("mongodb");
const express = require("express");
const bodyParser = require("express");
const port=1030;
const Oran="mongodb+srv://oran:co97@finalproject.gyyd2.mongodb.net/test";
const Yonatan ="mongodb+srv://YonatanAvizov:Sa0725rh@moneymanger.w0mn0.mongodb.net/test"
const uri = Yonatan;
host="localhost";
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const app=express();
const router = express.Router();
app.set('port',process.env.PORT||port);//whice port the app is going to listen
app.set('view engine', 'pug');//template oh html page to response
app.use(bodyParser.json());//data template of json

class User//for collection user
{
    constructor(id,firstname,lastname,birth,material) {
        this.id=id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birth=birth;
        this.metiral=material;
    }
}

class Product//for collection cost
{
    constructor(id,name,sum,cate,date,des) {
        this.id=id;
        this.name = name;
        this.sum = sum;
        this.cate=cate;
        this.date=date;
        this.des=des;
    }
}

class Item//for collection categories
{
    constructor(name,cate) {
        this.name = name;
        this.cate=cate;

    }
}

async function addProduct(product)//function that add product to cost collections
{
    const client = new MongoClient(uri);//create object that can talk with mongodb

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await client.db('bills').collection('cost').insertOne(product);
        console.log('product has just added to cost collection');
    } catch (e) {
        console.error(e.errmsg+'the product addition has just failed');
    } finally {
        await client.close();
    }
}

async function addUser(user)//function that add user to user collections
{
    const client = new MongoClient(uri);//create object that can talk with mongodb

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await client.db('bills').collection('user').insertOne(user);
        console.log('user has just added to user collection');

    } catch (e) {
        console.error(e.errmsg+'the user addition has just failed');
    } finally {
        await client.close();
    }
}

async function addCat(item)////function that add item to categories collections
{
    const client = new MongoClient(uri);//create object that can talk with mongodb

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await client.db('bills').collection('categories').insertOne(item);
        console.log('item has just added to categories collection');

    } catch (e) {
        console.error(e.errmsg+'the bills addition has just failed');
    } finally {
        await client.close();
    }
}


/*async function Find(res)
{
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        //await db("tirgul1").collection("respice").find(query, projection)
        let answer=await client.db("tirgul1").collection("respice").find( {});
        let ar= await answer.toArray();
        await answer.close();
        let str = "";
        for(let item of ar)
        {
            str += item.meal +'\t'+item.inger+'\n';
        }
        res.end(str);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}*/

async function display(res)//function that mange the addition of object and call function
 {
    const pro = new Product(123, 'chair', 100, 'home', date, 'bought new chair to home');
     const pro1 = new Product(306, 'table', 150, 'home', date, 'bought new table to home');
    const user = new User(123, 'Yonatan', 'Avizov', 200997, 'single');
     const user1 = new User(306, 'Oran', 'Cohen', 100297, 'Relationship');
     const user2 = new User(318, 'Asaf', 'Dangoor', 150496, 'single');
    const item = new Item('Laptop', 'Work');
     const item1 = new Item('Clothes', 'Private');
  //  await addProduct(pro);
   //await addUser(user1);
     //await addUser(user2);
    //await addCat(item1);
    const report = await outputReportById(123, null, null);
    return report;
}









<!-- Yonatan Avizov | 318432101 , Oran Cohen | 208585877 -->