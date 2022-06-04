//mange all the mongo db function
import {MongoClient} from "mongodb";

const Oran="mongodb+srv://oran:co97@finalproject.gyyd2.mongodb.net/test";
const Yonatan ="mongodb+srv://YonatanAvizov:Sa0725rh@moneymanger.w0mn0.mongodb.net/test"
const uri = Oran;
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
        let answer = await (client.db('bills').collection('cost').find( { 'id':id}).toArray());//error bug - don't return the right data
        //for year report
        if (year != null && month == null){
            return answer.filter((data) => {
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
            console.log('The report is for the month');
            return answer.filter((data) => {
                const myArray = data.date.split("-");
                let itemYear = myArray[0];
                let itemMonth = myArray[1];
                if (itemYear === year && itemMonth === month) {
                    return data;
                }
            });
        }
        //for all ID report
        console.log(answer);
        console.log('The report is for only id '+ id );
        return answer;
        
    } catch (e) {
        console.error('The output has been failed');
    } finally {
        await client.close();
    }
}