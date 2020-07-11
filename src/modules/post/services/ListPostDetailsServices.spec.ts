import "reflect-metadata";

import FakeUsersRepositories from '@modules/user/repositories/fakes/FakeUsersRepositories';
import CreateUserServices from '@modules/user/services/CreateUserServices';

import FakePostsRepositories from '../repositories/fakes/FakePostsRepositories';
import ListPostDetailsService from './ListPostDetailsServices';
import CreatePostServices from './CreatePostServices';

import AppError from "@shared/errors/AppError";

describe('AuthenticatedUser', () => {
  it('should be able to list the details about a specific post', async () => {
    const fakeUsersRepositories = new FakeUsersRepositories();
    const fakePostsRepositories = new FakePostsRepositories();

    const createUserServices = new CreateUserServices(fakeUsersRepositories);
    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);
    const listPostDetailsService = new ListPostDetailsService(fakePostsRepositories);

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

    const newPost = await createPostServices.execute(post);

    expect(await listPostDetailsService.execute(newPost.id)).toEqual(newPost);
  });

  it('should not be able to list the details about a specific post with the wrong id', async () => {
    const fakePostsRepositories = new FakePostsRepositories();
    const listPostDetailsService = new ListPostDetailsService(fakePostsRepositories);

    await expect(listPostDetailsService.execute('wrong id')).rejects.toBeInstanceOf(AppError);
  });
});