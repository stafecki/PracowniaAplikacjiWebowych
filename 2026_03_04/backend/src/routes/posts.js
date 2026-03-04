const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

function toInt(value) {
  if (value === undefined || value === null) return undefined;
  const n = Number(value);
  return Number.isInteger(n) ? n : NaN;
}
function toBool(value) {
  if (value === undefined) return undefined;
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

router.post('/', async (req, res, next) => {
  const { title, content, published, authorId, categoryId } = req.body;

  if (!title) {
    const e = new Error('Title is required');
    e.status = 400;
    return next(e);
  }

  const authorIdNum = toInt(authorId);
  const categoryIdNum = toInt(categoryId);
  if (authorId !== undefined && Number.isNaN(authorIdNum)) {
    const e = new Error('Invalid authorId');
    e.status = 400;
    return next(e);
  }
  if (categoryId !== undefined && Number.isNaN(categoryIdNum)) {
    const e = new Error('Invalid categoryId');
    e.status = 400;
    return next(e);
  }

  const publishedVal = toBool(published);
  if (published !== undefined && publishedVal === undefined) {
    const e = new Error('Invalid published value');
    e.status = 400;
    return next(e);
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: publishedVal ?? false,
        author: authorIdNum ? { connect: { id: authorIdNum } } : undefined,
        category: categoryIdNum ? { connect: { id: categoryIdNum } } : undefined
      }
    });
    return res.status(201).json(post);
  } catch (err) {
    if (err && err.code === 'P2025') {
      const e = new Error('Related resource not found');
      e.status = 404;
      return next(e);
    }
    err.status = err.status || 500;
    return next(err);
  }
});

router.get('/', async (req, res, next) => {
  const categoryIdNum = toInt(req.query.categoryId);

  if (req.query.categoryId !== undefined && Number.isNaN(categoryIdNum)) {
    const e = new Error('Invalid categoryId');
    e.status = 400;
    return next(e);
  }

  try {
    const posts = await prisma.post.findMany({
      where: categoryIdNum ? { categoryId: categoryIdNum } : undefined,
    });
    return res.status(200).json(posts);
  } catch (err) {
    err.status = 500;
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = toInt(req.params.id);
  if (Number.isNaN(id) || id <= 0) {
    const e = new Error('Invalid id');
    e.status = 400;
    return next(e);
  }

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      const e = new Error('Post not found');
      e.status = 404;
      return next(e);
    }
    return res.status(200).json(post);
  } catch (err) {
    err.status = 500;
    return next(err);
  }
});

router.get('/:id/comments', async (req, res, next) => {
  const id = toInt(req.params.id);
  if (Number.isNaN(id) || id <= 0) {
    const e = new Error('Invalid id');
    e.status = 400;
    return next(e);
  }

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      const e = new Error('Post not found');
      e.status = 404;
      return next(e);
    }
    const comments = await prisma.comment.findMany({ where: { postId: id }, orderBy: { createdAt: 'asc' } });
    return res.status(200).json(comments);
  } catch (err) {
    err.status = 500;
    return next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const id = toInt(req.params.id);
  if (Number.isNaN(id) || id <= 0) {
    const e = new Error('Invalid id');
    e.status = 400;
    return next(e);
  }

  const { title, content, published, authorId, categoryId } = req.body;
  const data = {};

  if (title !== undefined) data.title = title;
  if (content !== undefined) data.content = content;
  if (published !== undefined) {
    const pv = toBool(published);
    if (pv === undefined) {
      const e = new Error('Invalid published value');
      e.status = 400;
      return next(e);
    }
    data.published = pv;
  }

  if (authorId !== undefined) {
    const a = toInt(authorId);
    if (Number.isNaN(a) || a <= 0) {
      const e = new Error('Invalid authorId');
      e.status = 400;
      return next(e);
    }
    data.author = { connect: { id: a } };
  }

  if (categoryId !== undefined) {
    const c = toInt(categoryId);
    if (Number.isNaN(c) || c <= 0) {
      const e = new Error('Invalid categoryId');
      e.status = 400;
      return next(e);
    }
    data.category = { connect: { id: c } };
  }

  if (Object.keys(data).length === 0) {
    const e = new Error('No fields to update');
    e.status = 400;
    return next(e);
  }

  try {
    const post = await prisma.post.update({ where: { id }, data });
    return res.status(200).json(post);
  } catch (err) {
    if (err && err.code === 'P2025') {
      const e = new Error('Post not found');
      e.status = 404;
      return next(e);
    }
    err.status = err.status || 500;
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = toInt(req.params.id);
  if (Number.isNaN(id) || id <= 0) {
    const e = new Error('Invalid id');
    e.status = 400;
    return next(e);
  }

  try {
    const deleted = await prisma.post.delete({ where: { id } });
    return res.status(200).json(deleted);
  } catch (err) {
    if (err && err.code === 'P2025') {
      const e = new Error('Post not found');
      e.status = 404;
      return next(e);
    }
    err.status = err.status || 500;
    return next(err);
  }
});

module.exports = router;
