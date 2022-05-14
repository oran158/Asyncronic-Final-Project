const http =require("http");
const  url =require("url");
const {MongoClient} = require("mongodb");
port=1030;
const uri = "mongodb+srv://oran:co97@finalproject.gyyd2.mongodb.net/test";
host="localhost";
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

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

async function addProduct(product)
{

    const client = new MongoClient(uri);//create object that can talk with mongodb

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await client.db("bills").collection("cost").insertOne(product);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

async function addUser(user)
{

    const client = new MongoClient(uri);//create object that can talk with mongodb

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await client.db("bills").collection("user").insertOne(user);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

async function addCat(item)
{

    const client = new MongoClient(uri);//create object that can talk with mongodb

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await client.db("bills").collection("categories").insertOne(item);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

async function outputReportById(id)
{


    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        //await db("tirgul1").collection("respice").find(query, projection)
        let answer=await client.db("bills").collection("cost").find( { "id":id});
        let ar= await answer.toArray();
        await answer.close();
        let str = "";
        for(let item of ar)
        {
            str += item.id +'\t'+item.sum+'\n';
        }
        console.log(str);
        return str;

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }


}


/*async function outputReportByYear(str,year)
{


    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        //await db("tirgul1").collection("respice").find(query, projection)
        let answer=await client.db("bills").collection("cost").find( { "id":id});
        let ar= await answer.toArray();
        await answer.close();
        let str = "";
        for(let item of ar)
        {
            str += item.id +'\t'+item.sum+'\n';
        }
        res.end(str);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }


}*/

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


http.createServer(async function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    const pro = new Product(318, "chair", 100, "home", date, "bought new chair to home");
    const user = new User(123,"Yonatan","Avizov",200997,"single");
    const user1 = new User(318,"Yonatan","Avizov",200997,"single");
    const item = new Item("ladder","home");
    await addProduct(pro);
    //await addUser(user1);
    // await addCat(item);
    let out=outputReportById(318);
    //let outbyyear=outputReportByYear(out,2022);

    res.end("the report is "+out);

}).listen(port);

<!-- Yonatan Avizov | 318432101 -->
<!-- Oran Cohen | 208585877 -->