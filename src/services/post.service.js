import pool from '../config/db.js';
import ApiError from "../utils/ApiError.js";

export const getAllPosts = async () => {
  const [posts] = await pool.query(`
    SELECT 
      p.id,
      p.title,
      p.content,
      p.authorId,
      p.createdAt,
      u.username AS authorUsername,
      u.email AS authorEmail
    FROM posts p
    JOIN users u ON p.authorId = u.id
    ORDER BY p.createdAt DESC
  `);
  return posts;
};

export const getPostById = async (id) => {
  const [rows] = await pool.query(`
    SELECT 
      p.id,
      p.title,
      p.content,
      p.authorId,
      p.createdAt,
      u.username AS authorUsername,
      u.email AS authorEmail
    FROM posts p
    JOIN users u ON p.authorId = u.id
    WHERE p.id = ?
  `, [id]);

  if (!rows[0]) throw new ApiError(404, "Post not found");
  return rows[0];
};

export const createPost = async (postData, authorId) => {
  const { title, content } = postData;

  try {
    const [result] = await pool.query(
      'INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)',
      [title, content, authorId]
    );

    const newPost = await getPostById(result.insertId);
    return newPost;
  } catch (err) {
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new ApiError(400, 'Invalid author ID. User does not exist.');
    }
    console.error('Create Post Error:', err);
    throw new ApiError(500, 'Failed to create post.');
  }
};

export const updatePost = async (id, postData, userId) => {
    const { title, content } = postData;
    const post = await getPostById(id); 

    if (post.authorId !== userId) {
        throw new ApiError(403, "Forbidden: You do not have permission to edit this post.");
    }

    await pool.query(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [title, content, id]
    );
    const updatedPost = await getPostById(id);
    return updatedPost;
};

export const partiallyUpdatePost = async (id, updates) => {
  const allowedFields = ['title', 'content']; // Whitelist for security
  const fields = Object.keys(updates).filter(f => allowedFields.includes(f));
  
  if (fields.length === 0) return getPostById(id);

  const setClause = fields.map(field => `${field} = ?`).join(', ');
  const values = Object.values(updates).filter((v, i) => allowedFields.includes(Object.keys(updates)[i]));

  const [result] = await pool.query(
    `UPDATE posts SET ${setClause} WHERE id = ?`,
    [...values, id]
  );

  if (result.affectedRows === 0) return null;
  return getPostById(id);
};

export const deletePost = async (id, userId) => {
    const post = await getPostById(id);

    if (post.authorId !== userId) {
        throw new ApiError(403, "Forbidden: You do not have permission to delete this post.");
    }
    
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows;
};

export const getPostsByAuthorId = async (authorId) => {
    const [posts] = await pool.query(`
        SELECT 
            p.id,
            p.title,
            p.content,
            p.authorId,
            p.createdAt,
            u.username AS authorUsername,
            u.email AS authorEmail
        FROM posts p
        JOIN users u ON p.authorId = u.id
        WHERE p.authorId = ?
        ORDER BY p.createdAt DESC
    `, [authorId]);
    return posts;
};