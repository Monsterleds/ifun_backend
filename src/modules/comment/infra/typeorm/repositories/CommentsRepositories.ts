import { Repository, getRepository } from 'typeorm';

import Comment from '../entities/Comment';

interface CreateCommentsDTO {
  description: string;
  id_post: string;
}

class CommentsRepositories {
  private ormRepository: Repository<Comment>

  constructor() {
    this.ormRepository = getRepository(Comment);
  }

  public async create({ description, id_post }: CreateCommentsDTO): Promise<Comment> {
    const comment = this.ormRepository.create({ description, id_post });

    await this.ormRepository.save(comment);

    return comment;
  }
}

export default CommentsRepositories;