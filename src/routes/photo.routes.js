import { Router } from 'express';
import * as photoController from '../controllers/photo.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Photos
 *   description: Photo upload and management endpoints
 */

// All photo routes require authentication
router.use(authMiddleware);

/**
 * @swagger
 * /photos:
 *   get:
 *     summary: Get all photos for the authenticated user
 *     tags: [Photos]
 *     description: Retrieve all photos uploaded by the currently authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user's photos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       caption:
 *                         type: string
 *                       filePath:
 *                         type: string
 *                       userId:
 *                         type: integer
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/', photoController.getUserPhotos);

/**
 * @swagger
 * /photos/upload:
 *   post:
 *     summary: Upload a photo
 *     tags: [Photos]
 *     description: Upload a new photo with an optional caption (requires authentication)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: The photo file to upload
 *               caption:
 *                 type: string
 *                 example: Beautiful sunset
 *                 description: Optional caption for the photo
 *     responses:
 *       201:
 *         description: Photo uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     caption:
 *                       type: string
 *                     filePath:
 *                       type: string
 *                     userId:
 *                       type: integer
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request - No file uploaded
 *       401:
 *         description: Unauthorized
 */
router.post('/upload', upload.single('photo'), photoController.uploadPhoto);

/**
 * @swagger
 * /photos/{id}:
 *   delete:
 *     summary: Delete a photo
 *     tags: [Photos]
 *     description: Delete a photo (requires authentication and ownership)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Photo ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Photo deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - You don't own this photo
 *       404:
 *         description: Photo not found
 */
router.delete('/:id', photoController.deleteUserPhoto);

export default router;