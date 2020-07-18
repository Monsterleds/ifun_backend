import "reflect-metadata";

import User from '@modules/user/infra/typeorm/entities/User';

import FakePostsRepositories from '../repositories/fakes/FakePostsRepositories';
import CreatePostServices from './CreatePostServices';
import ListAllUserPostsServices from './ListAllUserPostsServices';

import FakeUsersRepositories from '@modules/user/repositories/fakes/FakeUsersRepositories';
import CreateUserServices from '@modules/user/services/CreateUserServices';

import AppError from "@shared/errors/AppError";

describe('ListAllUserPosts', () => {
  it('should be able to list all posts by id_user', async () => {
    const fakePostsRepositories = new FakePostsRepositories();
    const fakeUsersRepositories = new FakeUsersRepositories();
    
    const createUserServices = new CreateUserServices(fakeUsersRepositories);
    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);
    const listAllUserPostsServices = new ListAllUserPostsServices(fakeUsersRepositories, fakePostsRepositories);

    const { id: id_user } = await createUserServices.execute({
      email: 'kha.led002@hotmail.com',
      name: 'Khaled',
      password: '123456'
    }) as User;

    const post = await createPostServices.execute({ 
      id_user,
      title: 'TitlePost1',
      subtitle: 'SubtitlePost1',
      description: 'DescriptionPost1',
     });

    const allPosts = await listAllUserPostsServices.execute(id_user);

    expect(allPosts).toContain(post);
  });

  it('should not be able to list all posts with wrong id_user', async () => {
    const fakePostsRepositories = new FakePostsRepositories();
    const fakeUsersRepositories = new FakeUsersRepositories();
    
    const listAllUserPostsServices = new ListAllUserPostsServices(fakeUsersRepositories, fakePostsRepositories);

    await expect(listAllUserPostsServices.execute('Wrong id')).rejects.toBeInstanceOf(AppError)
  });
});