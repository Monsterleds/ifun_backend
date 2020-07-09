import PostsRepositories from '../repositories/PostsRepositories';

import AppError from '../errors/AppError';

class ListPostDetailsServices {
  public async execute(id: string) {
    const postsRepositories = new PostsRepositories();
    
    const post = await postsRepositories.findById(id);

    if(!post) {
      throw new AppError('Post does not exists');
    }

    return post;
  }
}

export default ListPostDetailsServices;