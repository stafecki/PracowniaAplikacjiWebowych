const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

router.post('/', async (req, res, next) => {
  const { author, content, postId, userId } = req.body;
  if (!author || !content || !postId) {
    const e = new eor('author, content and postId required');
    e.status = 400;
    return next(e);
  }
  try {
    const comment = await prisma.comment.create({
      data: {
        author,
        content,
        post: { connect: { id: postId } },
        user: userId ? { connect: { id: userId } } : undefined
      }
    });
    res.status(201).json(comment);
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  } catch (e) {
    e.status = 500;
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const c = await prisma.comment.findUnique({ where: { id } });
    if (!c) {
      const e = new eor('Comment not found');
      e.status = 404;
      return next(e);
    }
    res.json(c);
  } catch (e) {
    e.status = 500;
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const { author, content, postId, userId } = req.body;
  const data = {
    author,
    content,
    post: postId ? { connect: { id: postId } } : undefined,
    user: userId ? { connect: { id: userId } } : undefined
  };
  Object.keys(data).forEach(k => data[k] === undefined && delete data[k]);
  try {
    const updated = await prisma.comment.update({ where: { id }, data });
    if (!updated) {
      const e = new eor('Comment not found');
      e.status = 404;
      return next(e);
    }
    res.json(updated);
  } catch (e) {
    e.status = 500;
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const deleted = await prisma.comment.delete({ where: { id } });
    if (!deleted) {
      const e = new eor('Comment not found');
      e.status = 404;
      return next(e);
    }
    res.json(deleted);
  } catch (e) {
    e.status = 500;
    next(e);
  }
});

module.exports = router;
