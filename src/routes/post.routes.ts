import { Router } from 'express';

import CreatePostService from '../services/CreatePostServices';
import ListPostDetailsServices from '../services/ListPostDetailsServices';

const postRoutes = Router();

postRoutes.post('/', async (request, response) => {
  const { description, subtitle, title, id_user } = request.body;

  const createPostService = new CreatePostService();

  const post = await createPostService.execute({ description, subtitle, title, id_user })

  return response.json(post);
})

postRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const listPostDetailsServices = new ListPostDetailsServices();

  const post =  await listPostDetailsServices.execute(id);

  return response.json(post);
});

export default postRoutes;