import express from 'express';
import addUser, {addProduct, User} from "../public/javascripts/MangeBill.js";
//add product to cost collection
const usersRouter = express.Router();
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
/* GET users listing. */

//sending to add item function the item with details
//also add new user to user collection
usersRouter.get('/:id', async function(req, res, next) {
  const user = new User(313, 'Adi', 'O.z', 324528, 'single');
  await addProduct(req.params.id,req.params.name,req.params.sum,req.params.category,date,req.params.description);//we add product by req parameters
  await addUser(user);
  console.log('User has been added & product also add to bill collection');
  res.send('User has been added & product also add to bill collection');
});

export default usersRouter;
