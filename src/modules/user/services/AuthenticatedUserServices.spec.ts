import "reflect-metadata";

import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepositories';
import AuthenticatedUserServices from './AuthenticatedUserServices';
import CreateUserServices from './CreateUserServices';

import AppError from "@shared/errors/AppError";

describe('AuthenticatedUser', () => {
  it('should be able to authenticated the user', async () => {
    const fakeUsersRepositories = new FakeUsersRepositories();
    const createUserServices = new CreateUserServices(fakeUsersRepositories);
    const authenticatedUserServices = new AuthenticatedUserServices(fakeUsersRepositories);

    const user = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    }

    await createUserServices.execute(user);
    
    expect(
      await authenticatedUserServices.execute({
        email: user.email,
        password: user.password
      })
    ).toHaveProperty('token')
  });

  it('should not be able to authenticated the user', async () => {
    const fakeUsersRepositories = new FakeUsersRepositories();
    const createUserServices = new CreateUserServices(fakeUsersRepositories);
    const authenticatedUserServices = new AuthenticatedUserServices(fakeUsersRepositories);

    const user = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    }

    await createUserServices.execute(user);
    
    await expect(
      authenticatedUserServices.execute({
        email: user.email,
        password: 'any password'
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      authenticatedUserServices.execute({
        email: 'any email',
        password: user.password
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});