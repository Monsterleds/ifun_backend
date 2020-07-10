import { Router } from 'express';
import { container } from 'tsyringe';

import CreateUserServices from '@modules/user/services/CreateUserServices';
import ListAllUserServices from '@modules/user/services/ListAllUserServices';

const userRoutes = Router();

userRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserServices = container.resolve(CreateUserServices);

  const user = await createUserServices.execute({ name, email, password });

  return response.json(user);
});

userRoutes.get('/', async (request, response) => {
  const listAllUserServices = container.resolve(ListAllUserServices);

  const users = await listAllUserServices.execute();

  return response.json(users);
});

export default userRoutes;