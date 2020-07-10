import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import UsersRepositories from '../repositories/UsersRepositories';

import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

class AuthenticatedUserServices {
  public async execute({ email, password }: Request) {
    const usersRepositories = new UsersRepositories();

    const user = await usersRepositories.findByEmail(email);

    if(!user) {
      throw new AppError('Email/password does not match.', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError('Email/password does not match.', 401);
    }

    const token = sign({}, 'a41ddfbbd3c1c35b3825bdc1374453d4');

    delete user.password;

    return { user, token };
  }
}

export default AuthenticatedUserServices;