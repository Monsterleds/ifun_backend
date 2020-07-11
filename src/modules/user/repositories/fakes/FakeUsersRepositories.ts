import User from '../../infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

import IUsersRepositories from '@modules/user/repositories/IUsersRepositories';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';

class FakeUsersRepositories implements IUsersRepositories {
  private ormRepository: User[];

  constructor() {
    this.ormRepository = [];
  }

  public async create ({ name, email, password }: ICreateUserDTO): Promise<User> {
    const newUser = {
      id: uuid(),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
      post: [],
    }

    this.ormRepository.push(newUser);

    return newUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.find(user => user.email === email);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.find(user => user.id === id);

    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.ormRepository;
  }
}

export default FakeUsersRepositories;