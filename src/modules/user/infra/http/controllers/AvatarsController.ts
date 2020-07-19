import { Request, Response, NextFunction } from 'express';

class AvatarsControllers {
  public async create(request: Request, response: Response, next: NextFunction) {
    const url = `http://localhost:3333/files/${request.file.filename}`;

    return response.json({
      url
    });
  }
}

export default AvatarsControllers;