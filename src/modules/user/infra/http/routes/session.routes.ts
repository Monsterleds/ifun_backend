import { container } from 'tsyringe';
import { Router } from 'express';

import AuthenticatedUserServices from '@modules/user/services/AuthenticatedUserServices';

const routesSession = Router();

routesSession.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticatedUserServices = container.resolve(AuthenticatedUserServices);

  const { user, token } = await authenticatedUserServices.execute({ email, password });

  return response.json({ user, token });
});

export default routesSession;