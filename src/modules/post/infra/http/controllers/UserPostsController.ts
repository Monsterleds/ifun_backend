import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllUserPostsServices from '@modules/post/services/ListAllUserPostsServices';

export default class PostsController {
  public async index(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id } = request.params;

    const listAllUserPostsServices = container.resolve(ListAllUserPostsServices);
  
    const posts = await listAllUserPostsServices.execute(id);
  
    return response.json(posts);
  }
}