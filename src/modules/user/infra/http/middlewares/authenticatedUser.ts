import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken'

import authorizationUser from '@config/auth';

import AppError from '@shared/errors/AppError';

function authenticatedUser(request: Request, response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;

  if(!authorization) {
    throw new AppError('Faltando token de autenticação.', 401)
  }

  const [, token] = authorization.split(' ');

  try {
    verify(token, authorizationUser.jwt.secret);

    return next();
  } catch(err) {
    throw new AppError('Token invalido', 401)
  }
}

export default authenticatedUser;