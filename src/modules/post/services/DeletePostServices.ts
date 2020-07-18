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

    if(!posts[0]) {
      throw new AppError('User does not have any post created');
    }

    await this.postRepositories.delete(id_post);
  }
}

export default DeletePostServices;