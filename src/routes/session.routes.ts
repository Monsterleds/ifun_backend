import { Router } from 'express';

import AuthenticatedUserServices from '../services/AuthenticatedUserServices';

const routesSession = Router();

routesSession.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticatedUserServices = new AuthenticatedUserServices();

  const { user, token } = await authenticatedUserServices.execute({ email, password });

  return response.json({ user, token });
});

export default routesSession;