import express from 'express';
import addUser, {User} from "../public/javascripts/MangeBill.js";

const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/:id', async function(req, res, next) {
  const user = new User(313, 'Adi', 'O.z', 324528, 'single');
  await addUser(user);
  console.log('User has been added');
  res.send('User has been added');
});

export default usersRouter;
