import {MongoClient} from "mongodb";

const Oran="mongodb+srv://oran:co97@finalproject.gyyd2.mongodb.net/test";
const Yonatan ="mongodb+srv://YonatanAvizov:Sa0725rh@moneymanger.w0mn0.mongodb.net/test"
const uri = Oran;

export class User//for collection user
{
    constructor(id,firstname,lastname,birth,material) {
        this.id=id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birth=birth;
        this.metiral=material;
    }
}

export class Product//for collection cost
{
    constructor(id,name,sum,cate,date,des) {
        this.id = id;
        this.name = name;
        this.sum = sum;
        this.cate = cate;
        this.date = date;
        this.des = des;
    }
    msg = () => {return 'name: ' + this.name + 'description: ' + this.des} //need to fix
}

export class Item//for collection categories
{
    constructor(name,cate) {
        this.name = name;
        this.cate=cate;
    }
}

export async function addProduct(product)//function that add product to cost collections
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

export default async function addUser(user)//function that add user to user collections
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

export async function addCat(item)////function that add item to categories collections
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