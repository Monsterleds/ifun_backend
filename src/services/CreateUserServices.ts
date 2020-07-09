import User from '../models/User';

import AppError from '../errors/AppError';

import UsersRepositories from '../repositories/UsersRepositories';

interface RequestUserDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestUserDTO): Promise<User | undefined> {
    const usersRepositories = new UsersRepositories();

    const user = await usersRepositories.findByEmail(email);

    if(user) {
      throw new AppError('User already exists.');
    }

    const allUsers = await usersRepositories.create({ name, email, password });

    return allUsers;
  }
}

export default CreateUserService;