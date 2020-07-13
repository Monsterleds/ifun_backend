import { Request, Response,NextFunction } from "express";
import { container } from 'tsyringe';

import CreateUserServices from '@modules/user/services/CreateUserServices';
import ListAllUserServices from '@modules/user/services/ListAllUserServices';

export default class UsersController {
  public async create(request: Request, response: Response, next: NextFunction) {
    const { name, email, password } = request.body;

    const createUserServices = container.resolve(CreateUserServices);

    await createUserServices.execute({ name, email, password });

    next();
  }

  public async index(request: Request, response: Response, next: NextFunction) {
    const listAllUserServices = container.resolve(ListAllUserServices);

    const users = await listAllUserServices.execute();

    return response.json(users);
  }
}