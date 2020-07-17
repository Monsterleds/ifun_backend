import { Router } from 'express';

import authenticateUser from '@modules/user/infra/http/middlewares/authenticatedUser';

import UserPostsController from '../controllers/UserPostsController';

const userPostsController = new UserPostsController();

const userPostsRoutes = Router();

userPostsRoutes.use(authenticateUser);

userPostsRoutes.get('/:id', userPostsController.index);

export default userPostsRoutes;