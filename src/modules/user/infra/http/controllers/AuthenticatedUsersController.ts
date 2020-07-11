import { Request, Response,NextFunction } from "express";
import { container } from 'tsyringe';

import AuthenticatedUserServices from '@modules/user/services/AuthenticatedUserServices';

export default class AuthenticatedUserController {
  public async create(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    const authenticatedUserServices = container.resolve(AuthenticatedUserServices);

    const { user, token } = await authenticatedUserServices.execute({ email, password });

    return response.json({ user, token });
  }
}