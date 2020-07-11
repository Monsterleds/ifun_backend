import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import IUsersRepositories from '../repositories/IUsersRepositories';

@injectable()
class ListAllUserServices {
  constructor(
      @inject('UsersRepositories')
      private usersRepositories: IUsersRepositories
    ) {}
  
  public async execute(): Promise<User[]> {
    const allUsers = await this.usersRepositories.findAll();

    const usersEncrypted = allUsers.map(user => {
      delete user.email;
      delete user.password;

      return user;
    });

    return usersEncrypted;
  }
}

export default ListAllUserServices;