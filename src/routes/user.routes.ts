import { Router } from 'express';

import CreateUserSerive from '../services/CreateUserService';
import ListAllUserServices from '../services/ListAllUserServices';

const userRoutes = Router();

const createUserSerive = new CreateUserSerive();
const listAllUserServices = new ListAllUserServices();

userRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const user = await createUserSerive.execute({ name, email, password });

  return response.json(user);
});

userRoutes.get('/', async (request, response) => {
  const users = await listAllUserServices.execute();

  return response.json(users);
});

export default userRoutes;