import { inject, injectable } from 'tsyringe';

import ICommentsRepositories from '../repositories/ICommentsRepositories';
import IPostsRepositories from '@modules/post/repositories/IPostsRepositories';

import AppError from '@shared/errors/AppError';

interface Request {
  description: string;
  id_post: string;
}

@injectable()
class CreateCommentServices {
  constructor(
    @inject('PostsRepositories')
    private postsRepositories: IPostsRepositories,
    @inject('CommentsRepositories')
    private commentsRepositories: ICommentsRepositories
    ) {}

  public async execute({ description, id_post }: Request) {
    const post = await this.postsRepositories.findById(id_post);

    if(!post) {
      throw new AppError('Post does not exists', 400);
    }

    const comment = await this.commentsRepositories.create({ description, id_post });

    return comment;
  }
}

export default CreateCommentServices;