import { Router } from 'express';
import authRoutes from './auth.routes.js';
import postRoutes from './post.routes.js';
import commentRoutes from './comment.routes.js';
import userRoutes from './user.routes.js';
import photoRoutes from './photo.routes.js';

const router = Router();

// API v1 routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/photos', photoRoutes);

// Posts routes - includes nested comment routes
router.use('/posts', postRoutes);

// Standalone comments routes
router.use('/comments', commentRoutes);

export default router;