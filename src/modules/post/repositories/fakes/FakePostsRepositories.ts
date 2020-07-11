import Posts from '../../infra/typeorm/entities/Post';

import { uuid } from 'uuidv4';

import ICreatePostsDTO from '@modules/post/dtos/ICreatePostsDTO';

class PostsRepositories {
  private ormRepository: Posts[];

  constructor() {
    this.ormRepository = [];
  }

  public async create({ title, subtitle, description, id_user }: ICreatePostsDTO): Promise<Posts> {
    const post = {
      id: uuid(),
      title,
      subtitle,
      description,
      id_user,
      likes: 0,
      avatar_id: '',
      created_at: new Date(),
      updated_at: new Date(),
    } as Posts;
  
    this.ormRepository.push(post);

    return post;
  }

  public async findById(id: string): Promise <Posts | undefined> {
    const post = this.ormRepository.find(post => post.id === id);

    return post;
  }
}

export default PostsRepositories;