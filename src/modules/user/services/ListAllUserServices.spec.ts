import "reflect-metadata";

import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepositories';
import ListAllUserServices from './ListAllUserServices';
import CreateUserServices from './CreateUserServices';

describe('ListAllUsers', () => {
  it('should be able to list all registered users', async () => {
    const fakeUsersRepositories = new FakeUsersRepositories();

    const createUserServices = new CreateUserServices(fakeUsersRepositories);
    const listAllUserServices = new ListAllUserServices(fakeUsersRepositories);

    const user = {
      name: 'roberto',
      email: 'batata@gmial.com',
      password: '123456'
    }

    const newUser = await createUserServices.execute(user);
    const allUsers = await listAllUserServices.execute();

    expect(allUsers).toContain(newUser);
  });
});