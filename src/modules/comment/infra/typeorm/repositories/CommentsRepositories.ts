import { Repository, getRepository } from 'typeorm';

import ICreateCommentsDTO from '@modules/comment/dtos/ICreateCommentsDTO';

import Comment from '../entities/Comment';

class CommentsRepositories {
  private ormRepository: Repository<Comment>

  constructor() {
    this.ormRepository = getRepository(Comment);
  }

  public async create({ description, id_post, name }: ICreateCommentsDTO): Promise<Comment> {
    const comment = this.ormRepository.create({ description, id_post, name });

    await this.ormRepository.save(comment);

    return comment;
  }
}

export default CommentsRepositories;