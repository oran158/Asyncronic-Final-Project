//mange all the mongo db function


const  url =require("url");
const {MongoClient} = require("mongodb");
const Oran="mongodb+srv://oran:co97@finalproject.gyyd2.mongodb.net/test";
const Yonatan ="mongodb+srv://YonatanAvizov:Sa0725rh@moneymanger.w0mn0.mongodb.net/test"
const uri = Yonatan;
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();



async function outputReportById(id,year,month)//out put report by user id year and month
{
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        let answer=await client.db('bills').collection('cost').find( { 'id':id});
        let ar= await answer.toArray();
        await answer.close();
        let str = "";
        if (year != null && month == null) //for year report
        {
            console.log('the report is for the year');
            for(let item of ar)
            {
                const myArray = item.date.split("-");
                let itemYear = myArray[0];
                if (itemYear == year.toString()){
                    str += item.name+ '\t' +item.date + '\n';
                }
            }
            console.log('the report for the year is succeed');
            return str;
        }

        if (year != null && month != null)//for month report
        {
            console.log('the report is for the month');
            for(let item of ar) {
                const myArray = item.date.split("-");
                let itemYear = myArray[0];
                let itemMonth = myArray[1];
                if (itemYear == year.toString() && itemMonth == month.toString()) {
                    str += item.name + '\t' + item.date + '\n';
                }
            }
            console.log('the report  for the month is succeed');
            return str;

        }

        return ar; //for all ID report
        console.log('the report is for only id');
    } catch (e) {
        console.error('the output has been failed');
    } finally {
        await client.close();
    }
}