import { container } from 'tsyringe';

import UsersRepositories from '@modules/user/infra/typeorm/repositories/UsersRepositories';
import IUsersRepositories from '@modules/user/repositories/IUsersRepositories';

import PostsRepositories from '@modules/post/infra/typeorm/repositories/PostsRepositories';
import IPostRepositories from '@modules/post/repositories/IPostsRepositories';

import CommentsRepositories from '@modules/comment/infra/typeorm/repositories/CommentsRepositories';
import ICommentsRepositories from '@modules/comment/repositories/ICommentsRepositories';

container.registerSingleton<IUsersRepositories>('UsersRepositories', UsersRepositories);
container.registerSingleton<IPostRepositories>('PostsRepositories', PostsRepositories);
container.registerSingleton<ICommentsRepositories>('CommentsRepositories', CommentsRepositories);