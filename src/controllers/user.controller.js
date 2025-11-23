import * as userService from '../services/user.service.js';
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";



export const createUser = asyncHandler(async (req, res) => {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(new ApiResponse(201, newUser, 'User created successfully'));
});

export const getUserById = asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await userService.getUserById(userId);
    res.status(200).json(new ApiResponse(200, user, 'User retrieved successfully'));
});


export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(new ApiResponse(200, users, 'Users retrieved successfully'));
});

import * as postService from '../services/post.service.js';

export const getPostsByUser = asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const posts = await postService.getPostsByAuthorId(userId);
    res.status(200).json(new ApiResponse(200, posts, `Posts by user ${userId} retrieved successfully`));
});
