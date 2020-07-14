import Likes from '../infra/typeorm/entities/Likes';

import ILikesPostsDTO from '../dtos/ILikesPostsDTO';

export default interface ILikesRepositories {
  create({ id_post, id_user }: ILikesPostsDTO): Promise<void>;
  delete({ id_post, id_user }: ILikesPostsDTO): Promise<void>;
  findByIds({ id_post, id_user }: ILikesPostsDTO): Promise<Likes | undefined>;
}