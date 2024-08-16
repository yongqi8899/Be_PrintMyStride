import { Router } from 'express';
import validateJOI from '../middlewares/validateJOI.js';
import verifyToken from '../middlewares/verifyToken.js';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser
} from '../controllers/user.js';
import { userSchema } from '../joi/schemas.js';

const usersRouter = Router();

usersRouter.route('/').get(getAllUsers).post(verifyToken, validateJOI(userSchema), createUser);

usersRouter
  .route('/:id')
  .get(getSingleUser)
  .put(verifyToken, validateJOI(userSchema), updateUser)
  .delete(verifyToken, deleteUser);

export default usersRouter;