import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import IUsersRepositories from '../repositories/IUsersRepositories';

import AppError from '@shared/errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepositories')
    private usersRepositories: IUsersRepositories
  ) {}

  public async execute({ name, email, password }: Request): Promise<User | undefined> {
    const user = await this.usersRepositories.findByEmail(email);

    if(user) {
      throw new AppError('User already exists.');
    }

    const passwordHashed = await hash(password, 12)

    const allUsers = await this.usersRepositories.create({ name, email, password: passwordHashed });

    return allUsers;
  }
}

export default CreateUserService;