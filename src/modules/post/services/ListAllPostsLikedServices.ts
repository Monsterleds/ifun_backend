import { injectable, inject } from 'tsyringe';

import Likes from '../infra/typeorm/entities/Likes';

import IPostsRepositories from '../repositories/IPostsRepositories';
import ILikesRepositories from '../repositories/ILikesRepositories';
import IUsersRepositories from '@modules/user/repositories/IUsersRepositories';

import AppError from '@shared/errors/AppError';

@injectable()
class ListAllPostsLikedServices {
  constructor(
    @inject('LikesRepositories')
    private likesRepositories: ILikesRepositories,
    @inject('UsersRepositories')
    private usersRepositories: IUsersRepositories,
  ) {}
  
  public async execute(id_user: string): Promise<Likes[] | undefined> {
    const user = await this.usersRepositories.findById(id_user);

    if(!user) {
      throw new AppError('User or post does not exists.');
    }

    const isLiked = await this.likesRepositories.findByUser(id_user);

    return isLiked;
  }
}

export default ListAllPostsLikedServices;