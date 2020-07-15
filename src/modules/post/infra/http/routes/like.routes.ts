import { Router } from 'express';

import authenticateUser from '@modules/user/infra/http/middlewares/authenticatedUser';

import LikesController from '../controllers/LikesController';

const likesController = new LikesController();

const postRoutes = Router();

postRoutes.use(authenticateUser);

postRoutes.get('/likes/:id_user', likesController.show);

export default postRoutes;