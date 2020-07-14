import "reflect-metadata";

import FakeLikesRepositories from '../repositories/fakes/FakeLikesRepositories';
import UpdateLikePostServices from './UpdateLikePostServices';

import FakeUsersRepositories from '@modules/user/repositories/fakes/FakeUsersRepositories';
import CreateUserServices from '@modules/user/services/CreateUserServices';

import FakePostsRepositories from '../repositories/fakes/FakePostsRepositories';
import CreatePostServices from '../services/CreatePostServices';

import AppError from '@shared/errors/AppError';

describe('UpdateLikePost', () => {
  it('should be able to increment a like on post', async () => {
    const fakeUsersRepositories = new FakeUsersRepositories();
    const fakePostsRepositories = new FakePostsRepositories();
    const fakeLikesRepositories = new FakeLikesRepositories();

    const updateLikePostServices = new UpdateLikePostServices(fakePostsRepositories, fakeLikesRepositories, fakeUsersRepositories);
    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);
    const createUserServices = new CreateUserServices(fakeUsersRepositories);

    const user = await createUserServices.execute({
      name: 'roberto',
      email: 'roberto@hotmail.com',
      password: '123456'
    });

    if(!user) {
      throw new AppError('Error on create a user');
    }

    const post = await createPostServices.execute({
      title: 'Pog',
      subtitle: 'subpog',
      description: 'descpog',
      id_user: user.id
    })

    const { likes } = post;

    await updateLikePostServices.execute({ id_user: user.id, id_post: post.id });

    const likedIds = await fakeLikesRepositories.findByIds({ id_post: post.id, id_user: user.id })

    expect(likedIds).toHaveProperty('id');
    expect(post.likes).toEqual(likes + 1);
  });

  it('should not be able to increment a like on post with invalid params', async () => {
    const fakeUsersRepositories = new FakeUsersRepositories();
    const fakePostsRepositories = new FakePostsRepositories();
    const fakeLikesRepositories = new FakeLikesRepositories();

    const updateLikePostServices = new UpdateLikePostServices(fakePostsRepositories, fakeLikesRepositories, fakeUsersRepositories);
    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);
    const createUserServices = new CreateUserServices(fakeUsersRepositories);

    const user = await createUserServices.execute({
      name: 'roberto',
      email: 'roberto@hotmail.com',
      password: '123456'
    });

    if(!user) {
      throw new AppError('Error on create a user');
    }

    const post = await createPostServices.execute({
      title: 'Pog',
      subtitle: 'subpog',
      description: 'descpog',
      id_user: user.id
    })

    await expect(updateLikePostServices.execute({ id_user: 'dawd', id_post: 'adad' })).rejects.toBeInstanceOf(AppError)
    await expect(updateLikePostServices.execute({ id_user: 'dawd', id_post: post.id })).rejects.toBeInstanceOf(AppError)
    await expect(updateLikePostServices.execute({ id_user: user.id, id_post: 'dawd' })).rejects.toBeInstanceOf(AppError)
  });

  it('should be able to decrement a like on post', async () => {
    const fakeUsersRepositories = new FakeUsersRepositories();
    const fakePostsRepositories = new FakePostsRepositories();
    const fakeLikesRepositories = new FakeLikesRepositories();

    const updateLikePostServices = new UpdateLikePostServices(fakePostsRepositories, fakeLikesRepositories, fakeUsersRepositories);
    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);
    const createUserServices = new CreateUserServices(fakeUsersRepositories);

    const user = await createUserServices.execute({
      name: 'roberto',
      email: 'roberto@hotmail.com',
      password: '123456'
    });

    if(!user) {
      throw new AppError('Error on create a user');
    }

    const post = await createPostServices.execute({
      title: 'Pog',
      subtitle: 'subpog',
      description: 'descpog',
      id_user: user.id
    })

    const { likes } = post;

    await updateLikePostServices.execute({ id_user: user.id, id_post: post.id });
    await updateLikePostServices.execute({ id_user: user.id, id_post: post.id });

    const likedIds = await fakeLikesRepositories.findByIds({ id_post: post.id, id_user: user.id })

    expect(likedIds).toEqual(undefined);
    expect(post.likes).toEqual(likes);
  });
});