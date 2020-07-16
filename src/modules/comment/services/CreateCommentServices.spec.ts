import "reflect-metadata";

import FakeCommentRepository from '../repositories/fakes/FakeCommentRepositories';
import CreateCommentServices from './CreateCommentServices';

import FakePostsRepositories from '@modules/post/repositories/fakes/FakePostsRepositories';
import CreatePostServices from '@modules/post/services/CreatePostServices';

import FakeUsersRepositories from '@modules/user/repositories/fakes/FakeUsersRepositories';
import CreateUserServices from '@modules/user/services/CreateUserServices';

import AppError from '@shared/errors/AppError';

describe('CreateComment', () => {
  it('should be able to create a comment on post', async () => {
    const fakeUsersRepositories = new FakeUsersRepositories();
    const createUserServices = new CreateUserServices(fakeUsersRepositories);
    
    const fakePostsRepositories = new FakePostsRepositories();
    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);

    const fakeCommentRepository = new FakeCommentRepository();
    const createCommentServices = new CreateCommentServices(fakePostsRepositories, fakeCommentRepository);

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

    const { id } = await createPostServices.execute(post)

    const comment = await createCommentServices.execute({ id_post: id, name: newUser.name, description: 'WOWWW COOOOL' });

    expect(comment).toHaveProperty('id');
  })

  it('should not be able to create a comment on post with wrong post id', async () => {
    const fakePostsRepositories = new FakePostsRepositories();

    const fakeCommentRepository = new FakeCommentRepository();
    const createCommentServices = new CreateCommentServices(fakePostsRepositories, fakeCommentRepository);
 
    await expect(createCommentServices.execute({ id_post: 'wrong id', name: 'John Doe', description: 'WOWWW COOOOL' })).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to create a comment exceeding the max length', async () => {
    const fakeUsersRepositories = new FakeUsersRepositories();
    const createUserServices = new CreateUserServices(fakeUsersRepositories);
    
    const fakePostsRepositories = new FakePostsRepositories();
    const createPostServices = new CreatePostServices(fakeUsersRepositories, fakePostsRepositories);

    const fakeCommentRepository = new FakeCommentRepository();
    const createCommentServices = new CreateCommentServices(fakePostsRepositories, fakeCommentRepository);

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

    const { id } = await createPostServices.execute(post)
 
    await expect(createCommentServices.execute({ id_post: id, name: 'John Doe', description: 'EXCEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEDING' })).rejects.toBeInstanceOf(AppError);
  })
})