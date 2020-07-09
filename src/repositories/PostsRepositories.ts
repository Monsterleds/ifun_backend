import { Repository, getRepository } from 'typeorm';

import Posts from '../models/Post';

interface CreatePostsDTO {
  title: string;
  subtitle: string;
  description: string;
  likes: number;
  id_user: string;
}

class PostsRepositories {
  private ormRepository: Repository<Posts>

  constructor() {
    this.ormRepository = getRepository(Posts);
  }

  public async create({ title, subtitle, description, likes, id_user }: CreatePostsDTO) {
    const post = this.ormRepository.create({ title, subtitle, description, likes, id_user });

    await this.ormRepository.save(post);

    return post;
  }
}

export default PostsRepositories;