import UsersRepositories from '../repositories/UsersRepositories';
import PostsRepositories from '../repositories/PostsRepositories';

import AppError from '../errors/AppError';

interface RequestPostsDTO {
  title: string;
  subtitle: string;
  description: string;
  id_user: string;
  avatar_id?: string;
}

class CreatePostService {
  public async execute({ title, subtitle, description, id_user }: RequestPostsDTO) {
    const usersRepositories = new UsersRepositories();
    const postsRepositories = new PostsRepositories();
    
    const user = await usersRepositories.findById(id_user);

    if(!user) {
      throw new AppError('User does not exists');
    }

    const post = await postsRepositories.create({ title, subtitle, description, id_user })

    return post;
  }
}

export default CreatePostService;