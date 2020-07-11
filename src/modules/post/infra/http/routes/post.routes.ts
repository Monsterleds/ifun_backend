import { Router } from 'express';

import authenticateUser from '@modules/user/infra/http/middlewares/authenticatedUser';

import PostsController from '../controllers/PostsController';

const postsController = new PostsController();

const postRoutes = Router();

postRoutes.use(authenticateUser);

postRoutes.post('/', postsController.create);
postRoutes.get('/:id', postsController.index);

export default postRoutes;