import { inject, injectable } from 'tsyringe';

import ICommentsRepositories from '../repositories/ICommentsRepositories';
import IPostsRepositories from '@modules/post/repositories/IPostsRepositories';

import AppError from '@shared/errors/AppError';

interface Request {
  name: string;
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

  public async execute({ description, name, id_post }: Request) {
    const post = await this.postsRepositories.findById(id_post);

    if(!post || !name || !description) {
      throw new AppError('Post, name or description does not exists', 400);
    }

    if(description.length > 300) {
      throw new AppError('Description length is exceeded');
    }

    const comment = await this.commentsRepositories.create({ description, name, id_post });

    return comment;
  }
}

export default CreateCommentServices;