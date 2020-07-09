import { Router } from 'express';

import CreateUserServices from '../services/CreateUserServices';
import ListAllUserServices from '../services/ListAllUserServices';

const userRoutes = Router();

const createUserServices = new CreateUserServices();
const listAllUserServices = new ListAllUserServices();

userRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const user = await createUserServices.execute({ name, email, password });

  return response.json(user);
});

userRoutes.get('/', async (request, response) => {
  const users = await listAllUserServices.execute();

  return response.json(users);
});

export default userRoutes;