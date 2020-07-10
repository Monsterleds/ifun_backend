import { Router } from 'express';
import { container } from 'tsyringe';

import authenticateUser from '@modules/user/infra/http/middlewares/authenticatedUser';

import CreatePostService from '@modules/post/services/CreatePostServices';
import ListPostDetailsServices from '@modules/post/services/ListPostDetailsServices';

const postRoutes = Router();

postRoutes.use(authenticateUser);

postRoutes.post('/', async (request, response) => {
  const { description, subtitle, title, id_user } = request.body;

  const createPostService = container.resolve(CreatePostService);

  const post = await createPostService.execute({ description, subtitle, title, id_user })

  return response.json(post);
})

postRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const listPostDetailsServices = container.resolve(ListPostDetailsServices);

  const post =  await listPostDetailsServices.execute(id);

  return response.json(post);
});

export default postRoutes;