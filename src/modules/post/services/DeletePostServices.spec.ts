import "reflect-metadata";

import User from '@modules/user/infra/typeorm/entities/User';

import FakePostsRepositories from '../repositories/fakes/FakePostsRepositories';
import DeletePostServices from './DeletePostServices';
import CreatePostServices from './CreatePostServices';
import ListAllPostsServices from './ListAllPostsServices';

import FakeUsersRepositories from '@modules/user/repositories/fakes/FakeUsersRepositories';
import CreateUserServices from '@modules/user/services/CreateUserServices';

import AppError from "@shared/errors/AppError";

describe('DeletePost', () => {
  it('should be able to delete a post', async () => {
    const fakePostsRepositories = new FakePostsRepositories();
    const fakeUsersRepositories = new FakeUsersRepositories();
    
    const createUserServices = new CreateUserServices(fakeUsersRepositories);
    const deletePostServices = new DeletePostServices(fakePostsRepositories);
    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);
    const listAllPostsServices = new ListAllPostsServices(fakePostsRepositories);

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

    const allPosts = await listAllPostsServices.execute();

    expect(allPosts).toContain(post);
    
    await deletePostServices.execute({ id_user, id_post: post.id });
    
    expect(allPosts).not.toContain(post);
  });

  it('should not be able to delete a post with wrong user', async () => {
    const fakePostsRepositories = new FakePostsRepositories();
    
    const deletePostServices = new DeletePostServices(fakePostsRepositories);

    await expect(deletePostServices.execute({ id_user: 'Wrong id', id_post: 'Wrong id' })).rejects.toBeInstanceOf(AppError);
  });
});