import { Repository, getRepository } from 'typeorm';

import Posts from '../models/Post';

interface CreatePostsDTO {
  title: string;
  subtitle: string;
  description: string;
  id_user: string;
}

class PostsRepositories {
  private ormRepository: Repository<Posts>

  constructor() {
    this.ormRepository = getRepository(Posts);
  }

  public async create({ title, subtitle, description, id_user }: CreatePostsDTO) {
    const post = this.ormRepository.create({ title, subtitle, description, id_user });

    await this.ormRepository.save(post);

    return post;
  }

  public async findById(id: string): Promise <Posts | undefined> {
    const post = await this.ormRepository.findOne({ id });

    return post;
  }
}

export default PostsRepositories;