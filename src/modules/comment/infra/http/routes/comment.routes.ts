import { Router } from 'express';
import { container } from 'tsyringe';

import authenticateUser from '@modules/user/infra/http/middlewares/authenticatedUser';

import CreateCommentService from '@modules/comment/services/CreateCommentServices';

const commentsRoutes = Router();

commentsRoutes.use(authenticateUser);

commentsRoutes.post('/', async (request, response) => {
  const { description, id_post } = request.body;

  const createCommentService = container.resolve(CreateCommentService);

  const comment = await createCommentService.execute({ description, id_post });

  return response.json(comment)
});

export default commentsRoutes;