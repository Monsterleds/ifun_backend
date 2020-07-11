import { Router } from 'express';

import AuthenticatedUserController from '../controllers/AuthenticatedUsersController';

const authenticatedUserController = new AuthenticatedUserController();

const routesSession = Router();

routesSession.post('/', authenticatedUserController.create);

export default routesSession;