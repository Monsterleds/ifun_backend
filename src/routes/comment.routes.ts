import { Router } from 'express';

import CreateCommentService from '../services/CreateCommentServices';

const commentsRoutes = Router();

commentsRoutes.post('/', async (request, response) => {
  const { description, id_post } = request.body;

  const createCommentService = new CreateCommentService();

  const comment = await createCommentService.execute({ description, id_post });

  return response.json(comment)
});

export default commentsRoutes;