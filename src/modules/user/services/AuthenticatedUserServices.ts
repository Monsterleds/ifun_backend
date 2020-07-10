import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import authConfiguration from '@config/auth';
import IUsersRepositories from '../repositories/IUsersRepositories';

import AppError from '@shared/errors/AppError';

interface Request {
  email: string;
  password: string;
}

@injectable()
class AuthenticatedUserServices {
  constructor(
    @inject('UsersRepositories')
    private usersRepositories: IUsersRepositories
  ) {}

  public async execute({ email, password }: Request) {
    const user = await this.usersRepositories.findByEmail(email);

    if(!user) {
      throw new AppError('Email/password does not match.', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError('Email/password does not match.', 401);
    }

    const token = sign({}, authConfiguration.jwt.secret, {
      subject: user.id,
      expiresIn: authConfiguration.jwt.expiresIn,
    });

    delete user.password;

    return { user, token };
  }
}

export default AuthenticatedUserServices;