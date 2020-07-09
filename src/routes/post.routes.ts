import { Router } from 'express';

import CreatePostService from '../services/CreatePostService';

const postRoutes = Router();

postRoutes.post('/', async (request, response) => {
  const { description, likes, subtitle, title, id_user } = request.body;

  const createPostService = new CreatePostService();

  const post = await createPostService.execute({ description, likes, subtitle, title, id_user })

  return response.json(post);
})

export default postRoutes;