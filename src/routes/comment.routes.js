import { Router } from "express";
import * as commentController from "../controllers/comment.controller.js";
import { validateComment } from "../middlewares/validator.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management endpoints
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     description: Retrieve all comments from all posts
 *     responses:
 *       200:
 *         description: Successfully retrieved all comments
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
 *                     $ref: '#/components/schemas/Comment'
 *                 message:
 *                   type: string
 */
router.get("/", commentController.getAllComments);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Get comments for a specific post
 *     tags: [Comments]
 *     description: Retrieve all comments associated with a specific post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 */
router.get("/posts/:postId/comments", commentController.getCommentsByPostId);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Create a comment on a post
 *     tags: [Comments]
 *     description: Add a new comment to a specific post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - authorId
 *             properties:
 *               text:
 *                 type: string
 *                 example: This is a great post!
 *               authorId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Comment created successfully
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
 *                   $ref: '#/components/schemas/Comment'
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid postId or authorId
 */
router.post(
  "/posts/:postId/comments",
  validateComment,
  commentController.createCommentForPost
);

export default router;