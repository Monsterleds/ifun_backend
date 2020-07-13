import { Router } from 'express';

import AuthenticatedUserController from '../controllers/AuthenticatedUsersController';
import UsersControllers from '../controllers/UsersController';

const authenticatedUserController = new AuthenticatedUserController();
const usersControllers = new UsersControllers();

const userRoutes = Router();

userRoutes.post('/', usersControllers.create, authenticatedUserController.create);
userRoutes.get('/', usersControllers.index);

export default userRoutes;