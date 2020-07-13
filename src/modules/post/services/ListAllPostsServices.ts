import { inject, injectable } from 'tsyringe';

import IPostsRepositories from '../repositories/IPostsRepositories';

@injectable()
class ListAllPostsServices {
  constructor(
    @inject('PostsRepositories')
    private postsRepositories: IPostsRepositories
  ) {}

  public async execute() {
    const allPosts = await this.postsRepositories.findAll();

    return allPosts;
  }
}

export default ListAllPostsServices;