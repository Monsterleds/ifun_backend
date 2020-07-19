import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import AvatarsController from '../controllers/AvatarsController';

const avatarsController = new AvatarsController();

const userRoutes = Router();
const upload = multer(uploadConfig);

userRoutes.patch('/', upload.single('file'), avatarsController.create);

export default userRoutes;