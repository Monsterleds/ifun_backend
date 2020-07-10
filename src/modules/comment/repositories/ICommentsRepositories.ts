import Comment from '../infra/typeorm/entities/Comment';

import ICreateCommentsDTO from '../dtos/ICreateCommentsDTO';

export default interface ICommentsRepositories {
  create(data: ICreateCommentsDTO): Promise<Comment>;
}