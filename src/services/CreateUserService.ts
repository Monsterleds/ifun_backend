import User from '../models/User';

import UsersRepositories from '../repositories/UsersRepositories';

interface RequestUserDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestUserDTO): Promise<User | undefined> {
    try {
      const usersRepositories = new UsersRepositories();

      const findEmail = await usersRepositories.findByEmail(email);

      if(findEmail) {
        throw new Error('User already exists');
      }

      const allUsers = await usersRepositories.create({ name, email, password });

      return allUsers;
    } catch (err) {
      console.log(err);
    }
  }
}

export default CreateUserService;