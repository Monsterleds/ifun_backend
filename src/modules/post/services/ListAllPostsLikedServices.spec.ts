import "reflect-metadata";

import Likes from '../infra/typeorm/entities/Likes';

import FakeLikesRepositories from '../repositories/fakes/FakeLikesRepositories';
import ListAllPostsLikedServices from './ListAllPostsLikedServices';

import FakePostsRepositories from '../repositories/fakes/FakePostsRepositories';
import CreatePostServices from './CreatePostServices';
import UpdateLikePostServices from './UpdateLikePostServices';

import FakeUsersRepositories from '@modules/user/repositories/fakes/FakeUsersRepositories';
import CreateUserServices from '@modules/user/services/CreateUserServices';

import AppError from "@shared/errors/AppError";

describe('ListAllPostsLiked', () => {
  it('should be able to list all posts liked by user', async () => {
    const fakeLikesRepositories = new FakeLikesRepositories();
    const fakeUsersRepositories = new FakeUsersRepositories();
    const fakePostsRepositories = new FakePostsRepositories();

    const createUserServices = new CreateUserServices(fakeUsersRepositories);
    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);
    const updateLikePostServices = new UpdateLikePostServices(fakePostsRepositories, fakeLikesRepositories, fakeUsersRepositories);
    const listAllPostsLikedServices = new ListAllPostsLikedServices(fakeLikesRepositories, fakeUsersRepositories);
    
    const user = await createUserServices.execute({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: '123456'
    })

    if(!user) {
      throw new AppError('User needs to be created');
    }

    const post = await createPostServices.execute({
      title: 'Just a experimental test',
      subtitle: 'a little test',
      description: 'a small test',
      id_user: user.id
    })

    await updateLikePostServices.execute({ id_user: user.id, id_post: post.id });

    const [likedPosts] = await listAllPostsLikedServices.execute(user.id) as Likes[];

    expect([likedPosts]).toContainEqual({ id: likedPosts.id, id_post: post.id, id_user: user.id });
  });

  it('should not be able to list all posts liked by user with a wrong user_id', async () => {
    const fakeLikesRepositories = new FakeLikesRepositories();
    const fakeUsersRepositories = new FakeUsersRepositories();

    const listAllPostsLikedServices = new ListAllPostsLikedServices(fakeLikesRepositories, fakeUsersRepositories);
    
    await expect(listAllPostsLikedServices.execute('Wrong id')).rejects.toBeInstanceOf(AppError);
  });
});