import {MongoClient} from "mongodb";

const Oran="mongodb+srv://oran:co97@finalproject.gyyd2.mongodb.net/test";
const Yonatan ="mongodb+srv://YonatanAvizov:Sa0725rh@moneymanger.w0mn0.mongodb.net/test"
const uri = Yonatan;

export class User//class of user
{
    constructor(id,firstname,lastname,birth,material) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birth = birth;
        this.material = material;
    }
}

export class Product//class of product
{
    constructor(id, name, sum, cate, date, des) {
        this.id = id;
        this.name = name;
        this.sum = sum;
        this.cate = cate;
        this.date = date;
        this.des = des;
    }
}

export class Item//class of category of product
{
    constructor(name,cate) {
        this.name = name;
        this.cate=cate;
    }
}

//function that add product to cost collections
export async function addProduct(product)
{
    const client = new MongoClient(uri);//create object that can talk with mongodb
    let id= product.id;
    let sum= product.sum;
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

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // update in information collection the new total sum by id
        let report= await client.db('bills').collection('information').findOneAndUpdate({'id':id},{$inc:{'total_sum':sum}});
        if(report == null)
        {
            await createTotalSum(id,client);
        }
        console.log('product has just added to information collection');
    } catch (e) {
        console.error(e.errmsg+'the sum addition has just failed');
    } finally {
        await client.close();
    }
}

//function that add user to user collections
export default async function addUser(user) {
    const client = new MongoClient(uri);//create object that can talk with mongodb

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await client.db('bills').collection('user').insertOne(user);
        await createTotalSum(user,client);
        console.log('user has just added to user collection');
    } catch (e) {
        console.error(e.errmsg+'the user addition has just failed');
    } finally {
        await client.close();}
}

//function that add item to categories collections
export async function addCat(item) {
    const client = new MongoClient(uri);//create object that can talk with mongodb

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        console.log('item has just added to categories collection');
        await client.db('bills').collection('categories').insertOne(item);
    } catch (e) {
        console.error(e.errmsg+'the bills addition has just failed');
    } finally {
        await client.close();
    }
}
//function that crate total sum to user that is not exist in information collection
async function createTotalSum(userid,client)
{
    let total=await totalSum(userid,client)
    await client.db('bills').collection('information').insertOne({'id':userid,'total_sum':total});
}


//calculate the total sum in cost collection by id
 async function totalSum(userid,client)
{
    let total_sum=0;
    let answer = await (client.db('bills').collection('cost').find( { 'id':userid}).toArray());
    for (let item in answer)
    {
        total_sum+=answer[item].sum;
    }
    return total_sum;
}

//get the total sum from information collection by user id

export async function getTotalSum(userid)
{
    const client = new MongoClient(uri);//create object that can talk with mongodb
    let total=0;
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        //get to info all details of the userid from information collection
        let info=await client.db('bills').collection('information').findOne({'id':userid});
        if(info==null)
        {
            //call to create  total sum function to calculate the sum and update it in information collection
            await createTotalSum(userid,client);
            info=await client.db('bills').collection('information').findOne({'id':userid});
        }
        total=info.total_sum;
    } catch (e) {
        console.error(e.errmsg+'  has just failed');
    } finally {
        await client.close();
    }
    return total;
}

