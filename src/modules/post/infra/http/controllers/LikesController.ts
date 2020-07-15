import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllPostsLikedServices from '@modules/post/services/ListAllPostsLikedServices';

export default class PostsController {
  public async show(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id_user } = request.params;

    const listAllPostsLikedServices = container.resolve(ListAllPostsLikedServices);
  
    const post = await listAllPostsLikedServices.execute(id_user);
  
    return response.json(post);
  }
}