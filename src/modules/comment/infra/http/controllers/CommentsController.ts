import { Request, Response, NextFunction } from "express";
import { container } from 'tsyringe';

import CreateCommentService from '@modules/comment/services/CreateCommentServices';

export default class CommentsController {
  public async create(request: Request, response: Response, next: NextFunction) {
    const { description, id_post, name } = request.body;

    const createCommentService = container.resolve(CreateCommentService);

    const comment = await createCommentService.execute({ description, id_post, name });

    return response.json(comment)
  }
}