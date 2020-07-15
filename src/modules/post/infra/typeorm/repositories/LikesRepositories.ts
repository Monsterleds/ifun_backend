import { Repository, getRepository } from 'typeorm';

import ILikesPostsDTO from '@modules/post/dtos/ILikesPostsDTO';

import Likes from '../entities/Likes';

import ILikesRepositories from '@modules/post/repositories/ILikesRepositories';

class LikesRepositories implements ILikesRepositories {
  private ormRepositories: Repository<Likes>;

  constructor() {
    this.ormRepositories = getRepository(Likes);
  }

  public async create({ id_post, id_user }: ILikesPostsDTO): Promise<void> {
    const referencedTables = this.ormRepositories.create({ id_post, id_user });

    await this.ormRepositories.save(referencedTables);
  }

  public async findByIds({ id_post, id_user }: ILikesPostsDTO): Promise<Likes | undefined> {
    const likes = await this.ormRepositories.findOne({ where: { id_post: id_post, id_user: id_user } })

    return likes;
  }

  public async delete({ id_post, id_user }: ILikesPostsDTO): Promise<void> {
    await this.ormRepositories.delete({ id_post, id_user });
  }

  public async findByUser(id_user: string): Promise<Likes[] | undefined> {
    const allLikedsPosts = await this.ormRepositories.find({ where: { id_user } });

    return allLikedsPosts;
  }
}

export default LikesRepositories;