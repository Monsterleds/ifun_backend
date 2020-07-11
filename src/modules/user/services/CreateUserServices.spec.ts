import "reflect-metadata";

import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepositories';
import CreateUserServices from './CreateUserServices';

import AppError from "@shared/errors/AppError";

describe('CreateUsers', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepositories = new FakeUsersRepositories();
    const createUserServices = new CreateUserServices(fakeUsersRepositories);

    const user = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    }

    const newUser = await createUserServices.execute(user);

    expect(newUser).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email', async () => {
    const fakeUsersRepositories = new FakeUsersRepositories();
    const createUserServices = new CreateUserServices(fakeUsersRepositories);

    const user = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    }

      await createUserServices.execute(user);

      await expect(createUserServices.execute(user)).rejects.toBeInstanceOf(AppError);
  });
})