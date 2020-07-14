import "reflect-metadata";

import FakeUsersRepositories from '@modules/user/repositories/fakes/FakeUsersRepositories';
import CreateUserServices from '@modules/user/services/CreateUserServices';

import FakePostsRepositories from '../repositories/fakes/FakePostsRepositories';
import CreatePostServices from '../services/CreatePostServices';

import AppError from "@shared/errors/AppError";

describe('AuthenticatedUser', () => {
  it('should be able to create a new post', async () => {
    const fakePostsRepositories = new FakePostsRepositories();
    const fakeUsersRepositories = new FakeUsersRepositories();

    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);
    const createUserServices = new CreateUserServices(fakeUsersRepositories);

    const user = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    }

    const newUser = await createUserServices.execute(user);

    if(!newUser?.id) {
      throw new AppError('User need a id', 400)
    }

    const post = {
      id_user: newUser.id,
      title: 'funny hehe',
      subtitle: 'awd',
      description: 'HAHAHA COOL',
      avatar_id: ''
    };

    expect(await createPostServices.execute(post)).toHaveProperty('id');
  });

  it('should not be able to create a post without a user ', async () => {
    const fakePostsRepositories = new FakePostsRepositories();
    const fakeUsersRepositories = new FakeUsersRepositories();

    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);

    const post = {
      id_user: '',
      title: 'funny hehe',
      subtitle: 'awd',
      description: 'HAHAHA COOL',
      avatar_id: ''
    };

    await expect(createPostServices.execute(post)).rejects.toBeInstanceOf(AppError);
  });

  it('must not be able to create a post that exceeds the maximum description', async () => {
    const fakePostsRepositories = new FakePostsRepositories();
    const fakeUsersRepositories = new FakeUsersRepositories();

    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);
    const createUserServices = new CreateUserServices(fakeUsersRepositories);

    const user = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    }

    const newUser = await createUserServices.execute(user);

    if(!newUser?.id) {
      throw new AppError('User need a id', 400)
    }

    const post = {
      id_user: newUser.id,
      title: 'funny hehe',
      subtitle: 'awd',
      description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaaaaa',
      avatar_id: ''
    };

    await expect(createPostServices.execute(post)).rejects.toBeInstanceOf(AppError);
  });

  it('must not be able to create a post that exceeds the maximum subtitle', async () => {
    const fakePostsRepositories = new FakePostsRepositories();
    const fakeUsersRepositories = new FakeUsersRepositories();

    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);
    const createUserServices = new CreateUserServices(fakeUsersRepositories);

    const user = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    }

    const newUser = await createUserServices.execute(user);

    if(!newUser?.id) {
      throw new AppError('User need a id', 400)
    }

    const post = {
      id_user: newUser.id,
      title: 'funny hehe',
      subtitle: 'AAAAAAAAAAAAAAAAAAAAAAAAaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAAaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAAaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAAaaaaaaa',
      description: 'AAAAAAAAAAAAAAAAAAAAAAAAaaaaaaa',
      avatar_id: ''
    };

    await expect(createPostServices.execute(post)).rejects.toBeInstanceOf(AppError);
  });

  it('must not be able to create a post that exceeds the maximum title', async () => {
    const fakePostsRepositories = new FakePostsRepositories();
    const fakeUsersRepositories = new FakeUsersRepositories();

    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);
    const createUserServices = new CreateUserServices(fakeUsersRepositories);

    const user = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    }

    const newUser = await createUserServices.execute(user);

    if(!newUser?.id) {
      throw new AppError('User need a id', 400)
    }

    const post = {
      id_user: newUser.id,
      title: 'dadawdwadadawdwadadawdwadadawdwadadawdwadadawdwadadawdwadadawdwa',
      subtitle: 'awd',
      description: 'AAAAAAAAAAAaaaaaaa',
      avatar_id: ''
    };

    await expect(createPostServices.execute(post)).rejects.toBeInstanceOf(AppError);
  });
});