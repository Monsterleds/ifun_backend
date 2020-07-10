import Posts from '../infra/typeorm/entities/Post';

import ICreatePostsDTO from '../dtos/ICreatePostsDTO';

export default interface IPostsRepositories {
  findById(id: string): Promise <Posts | undefined>;
  create(data: ICreatePostsDTO): Promise<Posts>;
}