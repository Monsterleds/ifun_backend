import { Repository, getRepository } from 'typeorm';

import Posts from '../entities/Post';

import IPostsRepositories from '@modules/post/repositories/IPostsRepositories';
import ICreatePostsDTO from '@modules/post/dtos/ICreatePostsDTO';

class PostsRepositories implements IPostsRepositories {
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

  public async findAll(): Promise <Posts[]> {
    const allPosts = await this.ormRepository.find();

    return allPosts;
  }

  public async findByUserId(id_user: string): Promise<Posts[]> {
    const posts = await this.ormRepository.find({ where: { id_user } });

    return posts;
  }

  public async likeIncrement(id: string): Promise<void> {
    await this.ormRepository.increment({ id }, 'likes', 1);
  }

  public async likeDecrement(id: string): Promise<void> {
    await this.ormRepository.decrement({ id }, 'likes', 1);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default PostsRepositories;