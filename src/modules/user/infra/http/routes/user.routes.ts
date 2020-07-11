import { Router } from 'express';

import UsersControllers from '../controllers/UsersController';

const usersControllers = new UsersControllers();

const userRoutes = Router();

userRoutes.post('/', usersControllers.create);
userRoutes.get('/', usersControllers.index);

export default userRoutes;