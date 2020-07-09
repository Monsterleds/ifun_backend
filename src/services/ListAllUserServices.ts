import User from '../models/User';

import UsersRepositories from '../repositories/UsersRepositories';

class ListAllUserServices {
  public async execute(): Promise<User[]> {
    const usersRepositories = new UsersRepositories();

    const allUsers = await usersRepositories.findAll();

    return allUsers;
  }
}

export default ListAllUserServices;