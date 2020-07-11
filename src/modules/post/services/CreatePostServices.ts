import { inject, injectable } from 'tsyringe';

import IUsersRepositories from '@modules/user/repositories/IUsersRepositories';
import IPostsRepositories from '@modules/post/repositories/IPostsRepositories';

import AppError from '@shared/errors/AppError';

interface RequestDTO {
  title: string;
  subtitle: string;
  description: string;
  id_user: string;
  avatar_id?: string;
}

@injectable()
class CreatePostService {
  constructor(
    @inject('UsersRepositories')
    private usersRepositories: IUsersRepositories, 
    @inject('PostsRepositories')
    private postsRepositories: IPostsRepositories) {}

  public async execute({ title, subtitle, description, id_user }: RequestDTO) {
    const user = await this.usersRepositories.findById(id_user);

    if(!user) {
      throw new AppError('User does not exists');
    }

    const post = await this.postsRepositories.create({ title, subtitle, description, id_user })

    return post;
  }
}

export default CreatePostService;