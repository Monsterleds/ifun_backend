import Comment from '../../infra/typeorm/entities/Comment';

interface CreateCommentsDTO {
  description: string;
  id_post: string;
}

class CommentsRepositories {
  private ormRepository: Comment[];

  constructor() {
    this.ormRepository = [];
  }

  public async create({ description, id_post }: CreateCommentsDTO): Promise<Comment> {
    const comment = { 
      id: 'aa',
      description,
      id_post
    } as Comment;

    this.ormRepository.push(comment);

    return comment;
  }
}

export default CommentsRepositories;