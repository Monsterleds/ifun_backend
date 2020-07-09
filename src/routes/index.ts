import { Router } from 'express';

import UserRoutes from './user.routes';
import PostsRoutes from './post.routes';
import commentsRoutes from './comment.routes';

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/posts', PostsRoutes);
routes.use('/comments', commentsRoutes);

export default routes;