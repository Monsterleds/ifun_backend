import Posts from '../infra/typeorm/entities/Post';

import ICreatePostsDTO from '../dtos/ICreatePostsDTO';

export default interface IPostsRepositories {
  findAll(): Promise<Posts[]>;
  findById(id: string): Promise <Posts | undefined>;
  delete(id: string): Promise <void>;
  findByUserId(id: string): Promise <Posts[] | undefined>;
  create(data: ICreatePostsDTO): Promise<Posts>;
  likeIncrement(id: string): Promise<void>;
  likeDecrement(id: string): Promise<void>;
}