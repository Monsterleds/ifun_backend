import { inject, injectable } from 'tsyringe';

import ICommentsRepositories from '../repositories/ICommentsRepositories';

interface Request {
  description: string;
  id_post: string;
}

@injectable()
class CreateCommentServices {
  constructor(
    @inject('CommentsRepositories')
    private commentsRepositories: ICommentsRepositories) {}

  public async execute({ description, id_post }: Request) {
    const comment = await this.commentsRepositories.create({ description, id_post });

    return comment;
  }
}

export default CreateCommentServices;