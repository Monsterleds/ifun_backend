import { Router } from 'express';

import authenticateUser from '@modules/user/infra/http/middlewares/authenticatedUser';

import PostsController from '../controllers/PostsController';

const postsController = new PostsController();

const postRoutes = Router();

postRoutes.use(authenticateUser);

postRoutes.post('/', postsController.create);
postRoutes.get('/details/:id', postsController.show);
postRoutes.get('/all', postsController.index);

export default postRoutes;