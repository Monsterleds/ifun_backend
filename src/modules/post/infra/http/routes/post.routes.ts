import { Router } from 'express';

import authenticateUser from '@modules/user/infra/http/middlewares/authenticatedUser';

import PostsController from '../controllers/PostsController';

const postsController = new PostsController();

const postRoutes = Router();

postRoutes.get('/all', postsController.index);

postRoutes.use(authenticateUser);

postRoutes.post('/', postsController.create);
postRoutes.put('/likes', postsController.update);
postRoutes.get('/details/:id', postsController.show);
postRoutes.delete('/:id_user/:id_post', postsController.delete);

export default postRoutes;