import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePostService from '@modules/post/services/CreatePostServices';
import ListPostDetailsServices from '@modules/post/services/ListPostDetailsServices';

export default class PostsController {
  public async create(request: Request, response: Response, next: NextFunction) {
    const { description, subtitle, title, id_user } = request.body;

    const createPostService = container.resolve(CreatePostService);

    const post = await createPostService.execute({ description, subtitle, title, id_user })

    return response.json(post);
  }
  
  public async index(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    const listPostDetailsServices = container.resolve(ListPostDetailsServices);
  
    const post =  await listPostDetailsServices.execute(id);
  
    return response.json(post);
  }
}