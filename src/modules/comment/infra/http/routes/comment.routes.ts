import { Router } from 'express';

import authenticateUser from '@modules/user/infra/http/middlewares/authenticatedUser';

import CommentsController from '../controllers/CommentsController';

const commentsController = new CommentsController();

const commentsRoutes = Router();

commentsRoutes.use(authenticateUser);

commentsRoutes.post('/', commentsController.create);

export default commentsRoutes;