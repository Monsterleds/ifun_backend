import "reflect-metadata";

import FakeUsersRepositories from '@modules/user/repositories/fakes/FakeUsersRepositories';
import CreateUserServices from '@modules/user/services/CreateUserServices';

import FakePostsRepositories from '../repositories/fakes/FakePostsRepositories';
import CreatePostServices from '../services/CreatePostServices';
import ListAllPostsServices from '../services/ListAllPostsServices';

import AppError from "@shared/errors/AppError";

describe('ListAllPosts', () => {
  it('should be able to list all posts', async () => {
    const fakePostsRepositories = new FakePostsRepositories();
    const fakeUsersRepositories = new FakeUsersRepositories();

    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);
    const createUserServices = new CreateUserServices(fakeUsersRepositories);
    const listAllPostsServices = new ListAllPostsServices(fakePostsRepositories);

    const user = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    }

    const newUser = await createUserServices.execute(user);

    if(!newUser?.id) {
      throw new AppError('User need a id', 400)
    }

    const post1 = {
      id_user: newUser.id,
      title: 'funny hehe',
      subtitle: 'awd',
      description: 'HAHAHA COOL',
      avatar_id: ''
    };

    const post2 = {
      id_user: newUser.id,
      title: 'funny hehe',
      subtitle: 'awd',
      description: 'HAHAHA COOL',
      avatar_id: ''
    };

    const newPost1 = await createPostServices.execute(post1);
    const newPost2 = await createPostServices.execute(post2);

    const allPosts = await listAllPostsServices.execute();

    expect(allPosts).toContain(newPost1);
    expect(allPosts).toContain(newPost2);
  });
});