import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePostService from '@modules/post/services/CreatePostServices';
import ListPostDetailsServices from '@modules/post/services/ListPostDetailsServices';
import ListAllPostsServices from '@modules/post/services/ListAllPostsServices';
import UpdateLikePostServices from '@modules/post/services/UpdateLikePostServices';
import DeletePostServices from '@modules/post/services/DeletePostServices';

export default class PostsController {
  public async create(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const data = request.body;

    const createPostService = container.resolve(CreatePostService);

    const post = await createPostService.execute(data)

    return response.json(post);
  }
  
  public async show(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id } = request.params;

    const listPostDetailsServices = container.resolve(ListPostDetailsServices);
  
    const post = await listPostDetailsServices.execute(id);
  
    return response.json(post);
  }

  public async index(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const listAllPostsServices = container.resolve(ListAllPostsServices);
  
    const allPosts =  await listAllPostsServices.execute();
  
    return response.json(allPosts);
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id_post, id_user } = request.body; 

    const updateLikePostServices = container.resolve(UpdateLikePostServices);

    const likedPost = await updateLikePostServices.execute({ id_user, id_post });

    return response.json(likedPost);
  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id_post, id_user } = request.params; 

    const deletePostServices = container.resolve(DeletePostServices);

    await deletePostServices.execute({ id_post, id_user });

    return response.status(200).json();
  }
}