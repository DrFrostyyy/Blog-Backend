import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";

export const getAllComments = async () => {
  const [rows] = await pool.query(`
    SELECT 
      c.id,
      c.text,
      c.postId,
      c.authorId,
      c.createdAt,
      u.username AS authorUsername
    FROM comments c
    JOIN users u ON c.authorId = u.id
  `);
  return rows;
};

export const getCommentsByPostId = async (postId) => {
  const [rows] = await pool.query(`
    SELECT 
      c.id,
      c.text,
      c.postId,
      c.authorId,
      c.createdAt,
      u.username AS authorUsername
    FROM comments c
    JOIN users u ON c.authorId = u.id
    WHERE c.postId = ?
  `, [postId]);
  return rows;
};

export const createComment = async (postId, authorId, commentData) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO comments (text, postId, authorId) VALUES (?, ?, ?)",
      [commentData.text, postId, authorId]
    );

    const [rows] = await pool.query(`
      SELECT 
        c.id,
        c.text,
        c.postId,
        c.authorId,
        c.createdAt,
        u.username AS authorUsername
      FROM comments c
      JOIN users u ON c.authorId = u.id
      WHERE c.id = ?
    `, [result.insertId]);

    return rows[0];
  } catch (error) {
    console.error("DB Error:", error);
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      throw new ApiError(
        400,
        "Invalid postId or authorId. The specified post or user does not exist."
      );
    }
    throw error;
  }
};