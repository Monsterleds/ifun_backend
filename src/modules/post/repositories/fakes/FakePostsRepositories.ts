import Posts from '../../infra/typeorm/entities/Post';

import { uuid } from 'uuidv4';

import ICreatePostsDTO from '@modules/post/dtos/ICreatePostsDTO';

import IPostsRepositories from '../IPostsRepositories';

class PostsRepositories implements IPostsRepositories {
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

  public async findAll(): Promise <Posts[]> {
    return this.ormRepository;
  }

  public async likeIncrement(id: string): Promise<void> {
    const newPost = this.ormRepository.find(post => post.id === id);

    if(!newPost) {
      return;
    }

    Object.assign(newPost, {
      likes: newPost.likes + 1
    })

    this.ormRepository.push(newPost);
  }

  public async likeDecrement(id: string): Promise<void> {
    const newPost = this.ormRepository.find(post => post.id === id);

    if(!newPost) {
      return;
    }

    Object.assign(newPost, {
      likes: newPost.likes - 1
    })

    this.ormRepository.push(newPost);
  }
}

export default PostsRepositories;