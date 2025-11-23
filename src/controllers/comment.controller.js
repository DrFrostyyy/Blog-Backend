import * as commentService from "../services/comment.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllComments = asyncHandler(async (req, res) => {
  const comments = await commentService.getAllComments();
  res.json(new ApiResponse(200, comments));
});

export const getCommentsByPostId = asyncHandler(async (req, res) => {
  const comments = await commentService.getCommentsByPostId(req.params.postId);
  res.json(new ApiResponse(200, comments));
});

export const createCommentForPost = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const { text, authorId } = req.body;

  const comment = await commentService.createComment(postId, authorId, { text });

  res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment created successfully"));
});
