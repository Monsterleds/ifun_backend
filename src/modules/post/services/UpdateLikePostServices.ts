import { inject, injectable } from 'tsyringe';

import Post from '../infra/typeorm/entities/Post';

import ILikesPostsDTO from '@modules/post/dtos/ILikesPostsDTO';

import IPostsRepositories from '../repositories/IPostsRepositories';
import ILikesRepositories from '../repositories/ILikesRepositories';
import IUsersRepositories from '@modules/user/repositories/IUsersRepositories';

import AppError from '@shared/errors/AppError';

@injectable()
class UpdateLikePostServices {
  constructor(
    @inject('PostsRepositories')
    private postsRepositories: IPostsRepositories,
    @inject('LikesRepositories')
    private likesRepositories: ILikesRepositories,
    @inject('UsersRepositories')
    private usersRepositories: IUsersRepositories,
  ) {}

  public async execute({ id_post, id_user }: ILikesPostsDTO): Promise<object> {
    const user = await this.usersRepositories.findById(id_user);
    const post = await this.postsRepositories.findById(id_post);

    if(!post || !user) {
      throw new AppError('User or post does not exists.');
    }

    let alreadyLiked = !!await this.likesRepositories.findByIds({ id_post, id_user })

    if(alreadyLiked) {
      await this.postsRepositories.likeDecrement(id_post);
      await this.likesRepositories.delete({ id_post, id_user });

      alreadyLiked = false;
    } else {
      await this.postsRepositories.likeIncrement(id_post);
      await this.likesRepositories.create({ id_post, id_user });

      alreadyLiked = true;
    }

    const { likes } = await this.postsRepositories.findById(id_post) as Post;

    return { likes, alreadyLiked };
  }
}

export default UpdateLikePostServices;