//mange all the mongo db function
import {MongoClient} from "mongodb";

const Oran="mongodb+srv://oran:co97@finalproject.gyyd2.mongodb.net/test";
const Yonatan ="mongodb+srv://YonatanAvizov:Sa0725rh@moneymanger.w0mn0.mongodb.net/test"
const uri = Yonatan;
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

//function that output report by id month and year ,using by split .
export async function outputReportById(id, year, month)
{
    const client = new MongoClient(uri);
    console.log('i am in report function ');
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        let answer= await client.db('bills').collection('cost').find( { 'id':id});//error bug answer=>ar
        const ar= await answer.toArray();
        console.log(answer.toString());
        await answer.close();
        //for year report
        if (year != null && month == null){
            return ar.filter((data) => {
                const myArray = data.date.split("-");
                let itemYear = myArray[0];
                if (itemYear === year) {
                    return data;
                }
            });
        }

        //for month report
        if (year != null && month != null)
        {
            console.log('the report is for the month');
            for(let item of ar) {
                const myArray = item.date.split("-");
                let itemYear = myArray[0];
                let itemMonth = myArray[1];
                if (itemYear === year.toString() && itemMonth === month.toString()) {

                }
            }
            console.log('the report  for the month is succeed');
            return ar;

        }
        console.log('the report is for only id'+ id );
        //for all ID report
        return ar;


    } catch (e) {
        console.error('the output has been failed');
    } finally {
        await client.close();
    }
}