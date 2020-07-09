import { Repository, getRepository } from 'typeorm';

import User from '../models/User';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

class UsersRepositories {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create ({ name, email, password }: CreateUserDTO): Promise<User> {
    const newUser = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(newUser);

    return newUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findEmail = await this.ormRepository.findOne({ where: { email }});

    return findEmail;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ where: { id }});

    return findUser;
  }

  public async findAll(): Promise<User[]> {
    const allUsers = this.ormRepository.find();

    return allUsers;
  }
}

export default UsersRepositories;