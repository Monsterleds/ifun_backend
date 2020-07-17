import { injectable, inject } from 'tsyringe';

import IUsersRepositories from '@modules/user/repositories/IUsersRepositories';
import IPostsRepositories from '@modules/post/repositories/IPostsRepositories';

import Post from '../infra/typeorm/entities/Post';

import AppError from '@shared/errors/AppError';

@injectable()
class ListAllUserPostsServices {
  constructor(
    @inject('UsersRepositories')
    private usersRepositories: IUsersRepositories,
    @inject('PostsRepositories')
    private postsRepositories: IPostsRepositories
  ) {}

  public async execute(id_user: string): Promise<Post[] | undefined> {
    const user = await this.usersRepositories.findById(id_user);

    if(!user) {
      throw new AppError('User does not exists');
    }

    const allUsersPosts = await this.postsRepositories.findByUserId(id_user);

    return allUsersPosts;
  }
}

export default ListAllUserPostsServices;