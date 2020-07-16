import { uuid } from 'uuidv4';

import ILikesPostsDTO from '@modules/post/dtos/ILikesPostsDTO';

import Likes from '../../infra/typeorm/entities/Likes';

import ILikesRepositories from '@modules/post/repositories/ILikesRepositories';

class FakeLikesRepositories implements ILikesRepositories {
  private ormRepositories: Likes[];

  constructor() {
    this.ormRepositories = [];
  }

  public async create({ id_post, id_user }: ILikesPostsDTO): Promise<void> {
    this.ormRepositories.push({ 
      id: uuid(),
      id_post,
      id_user
    } as Likes);
  }

  public async findByIds({ id_post, id_user }: ILikesPostsDTO): Promise<Likes | undefined> {
    const likes = this.ormRepositories.find(post => (post.id_post === id_post && post.id_user === id_user));
    
    return likes;
  }

  public async delete({ id_post, id_user }: ILikesPostsDTO): Promise<void> {
    const index = this.ormRepositories.findIndex(post => (post.id_post === id_post && post.id_user === id_user))

    this.ormRepositories.splice(index);
  }

  public async findByUser(id_user: string): Promise<Likes[] | undefined> {
    const allLikedsPosts = this.ormRepositories.filter(like => like.id_user === id_user);

    return allLikedsPosts;
  }
}

export default FakeLikesRepositories;