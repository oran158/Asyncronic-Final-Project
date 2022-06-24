import express from 'express';
import addUser, {User} from "../public/javascripts/MangeBill.js";
const usersRouter = express.Router();
/* POST users listing. */
//getting from the page all the details of the new user => calling to add user function => return of succeed message

usersRouter.post('/signUp', async function (req, res, next) {
  res.render('userSignUp',{title:'Sign up',message:'Welcome, Please sign up'});
});

//getting from the page all the details of the new user => calling to add user function => return of succeed message
usersRouter.post('/signUp/addUser', async function (req, res, next) {
  console.log('user sign up');
  let id = parseInt(req.body.id);
  let firstN = req.body.firstName;
  let lastN = req.body.lastName;
  let birth = parseInt(req.body.birth);
  let material = req.body.material;
  let user = new User(id,firstN,lastN,birth,material);
  await addUser(user);
  res.render('alertAddUser',{title:id,message:"Please confirm your ID"});
});


export default usersRouter;