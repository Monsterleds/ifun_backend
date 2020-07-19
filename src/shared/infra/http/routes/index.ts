import { Router } from 'express';

import UserRoutes from '@modules/user/infra/http/routes/user.routes';
import AvatarRoutes from '@modules/user/infra/http/routes/avatar.routes';
import UserPosts from '@modules/post/infra/http/routes/user_post.routes';
import PostsRoutes from '@modules/post/infra/http/routes/post.routes';
import LikesRoutes from '@modules/post/infra/http/routes/like.routes';
import SessionsRoutes from '@modules/user/infra/http/routes/session.routes';
import CommentsRoutes from '@modules/comment/infra/http/routes/comment.routes';

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/users/avatar', AvatarRoutes);
routes.use('/posts', PostsRoutes, LikesRoutes);
routes.use('/sessions', SessionsRoutes);
routes.use('/comments', CommentsRoutes);
routes.use('/user/post', UserPosts);

export default routes;