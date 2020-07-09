import { Router } from 'express';

import UserRoutes from './user.routes';
import PostsRoutes from './post.routes';

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/posts', PostsRoutes);

export default routes;