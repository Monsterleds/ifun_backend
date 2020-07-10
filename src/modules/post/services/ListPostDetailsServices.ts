import { inject, injectable } from 'tsyringe';

import IPostsRepositories from '../repositories/IPostsRepositories';

import AppError from '@shared/errors/AppError';

@injectable()
class ListPostDetailsServices {
  constructor(
    @inject('PostsRepositories')
    private postsRepositories: IPostsRepositories
  ) {}

  public async execute(id: string) {
    const post = await this.postsRepositories.findById(id);

    if(!post) {
      throw new AppError('Post does not exists');
    }

    return post;
  }
}

export default ListPostDetailsServices;