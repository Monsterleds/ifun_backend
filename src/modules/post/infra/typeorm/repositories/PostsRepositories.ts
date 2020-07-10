import { Repository, getRepository } from 'typeorm';

import Posts from '../entities/Post';

import ICreatePostsDTO from '@modules/post/dtos/ICreatePostsDTO';

class PostsRepositories {
  private ormRepository: Repository<Posts>

  constructor() {
    this.ormRepository = getRepository(Posts);
  }

  public async create({ title, subtitle, description, id_user }: ICreatePostsDTO): Promise<Posts> {
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