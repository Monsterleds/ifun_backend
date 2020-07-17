import { injectable, inject } from 'tsyringe';

import IPostsRepositories from '../repositories/IPostsRepositories';
import AppError from '@shared/errors/AppError';

interface RequestDTO {
  id_user: string;
  id_post: string;
}

@injectable()
class DeletePostServices {
  constructor(
    @inject('PostsRepositories')
    private postRepositories: IPostsRepositories,

  ) {}

  public async execute({ id_user, id_post }: RequestDTO): Promise<void> {
    const posts = await this.postRepositories.findByUserId(id_user);

    if(!posts) {
      throw new AppError('User does not have any post created');
    }

    const post = posts.find(post => post.id === id_post);

    if(!post) {
      throw new AppError('User does not have created this post');
    }

    await this.postRepositories.delete(id_post);
  }
}

export default DeletePostServices;