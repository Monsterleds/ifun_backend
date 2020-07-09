import CommentsRepositories from '../repositories/CommentsRepositories';

interface CreateCommentsDTO {
  description: string;
  id_post: string;
}

class CreateCommentServices {
  public async execute({ description, id_post }: CreateCommentsDTO) {
    const commentsRepositories = new CommentsRepositories();
    
    const comment = await commentsRepositories.create({ description, id_post });

    return comment;
  }
}

export default CreateCommentServices;