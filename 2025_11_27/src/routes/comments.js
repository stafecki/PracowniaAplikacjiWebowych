const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

router.post('/', async (req, res, next) => {
  let { author, content, postId, userId } = req.body;
  if (!author || !content || postId === undefined) {
    const e = new Error('author, content and postId required');
    e.status = 400;
    return next(e);
  }

  const postIdNum = Number(postId);
  if (!Number.isInteger(postIdNum) || postIdNum <= 0) {
    const e = new Error('Invalid postId');
    e.status = 400;
    return next(e);
  }
  const userIdNum = userId === undefined ? undefined : Number(userId);
  if (userId !== undefined && (!Number.isInteger(userIdNum) || userIdNum <= 0)) {
    const e = new Error('Invalid userId');
    e.status = 400;
    return next(e);
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        author,
        content,
        post: { connect: { id: postIdNum } },
        user: userIdNum ? { connect: { id: userIdNum } } : undefined
      }
    });
    return res.status(201).json(comment);
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
  try {
    const comments = await prisma.comment.findMany();
    return res.status(200).json(comments);
  } catch (err) {
    err.status = 500;
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    const e = new Error('Invalid id');
    e.status = 400;
    return next(e);
  }

  try {
    const c = await prisma.comment.findUnique({ where: { id } });
    if (!c) {
      const e = new Error('Comment not found');
      e.status = 404;
      return next(e);
    }
    return res.status(200).json(c);
  } catch (err) {
    err.status = 500;
    return next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    const e = new Error('Invalid id');
    e.status = 400;
    return next(e);
  }

  const { author, content, postId, userId } = req.body;
  const data = {};
  if (author !== undefined) data.author = author;
  if (content !== undefined) data.content = content;
  if (postId !== undefined) {
    const postIdNum = Number(postId);
    if (!Number.isInteger(postIdNum) || postIdNum <= 0) {
      const e = new Error('Invalid postId');
      e.status = 400;
      return next(e);
    }
    data.post = { connect: { id: postIdNum } };
  }
  if (userId !== undefined) {
    const userIdNum = Number(userId);
    if (!Number.isInteger(userIdNum) || userIdNum <= 0) {
      const e = new Error('Invalid userId');
      e.status = 400;
      return next(e);
    }
    data.user = { connect: { id: userIdNum } };
  }

  if (Object.keys(data).length === 0) {
    const e = new Error('No fields to update');
    e.status = 400;
    return next(e);
  }

  try {
    const updated = await prisma.comment.update({ where: { id }, data });
    return res.status(200).json(updated);
  } catch (err) {
    if (err && err.code === 'P2025') {
      const e = new Error('Comment not found');
      e.status = 404;
      return next(e);
    }
    err.status = err.status || 500;
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    const e = new Error('Invalid id');
    e.status = 400;
    return next(e);
  }

  try {
    const deleted = await prisma.comment.delete({ where: { id } });
    return res.status(200).json(deleted);
  } catch (err) {
    if (err && err.code === 'P2025') {
      const e = new Error('Comment not found');
      e.status = 404;
      return next(e);
    }
    err.status = err.status || 500;
    return next(err);
  }
});

module.exports = router;
