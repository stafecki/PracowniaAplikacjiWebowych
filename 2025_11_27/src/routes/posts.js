const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

router.post('/', async (req, res, next) => {
  const { title, content, published, authorId, categoryId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published ?? false,
        author: authorId ? { connect: { id: authorId } } : undefined,
        category: categoryId ? { connect: { id: categoryId } } : undefined
      }
    });
    res.status(201).json(post);
  } catch (e) {
    e.status = 500;
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (e) {
    e.status = 500;
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      const e = new Error('Post not found');
      e.status = 404;
      return next(e);
    }
    res.json(post);
  } catch (e) {
    e.status = 500;
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const { title, content, published, authorId, categoryId } = req.body;
  const data = {
    title,
    content,
    published,
    author: authorId ? { connect: { id: authorId } } : undefined,
    category: categoryId ? { connect: { id: categoryId } } : undefined
  };
  Object.keys(data).forEach(k => data[k] === undefined && delete data[k]);
  try {
    const post = await prisma.post.update({ where: { id }, data });
    if (!post) {
      const e = new Error('Post not found');
      e.status = 404;
      return next(e);
    }
    res.json(post);
  } catch (e) {
    e.status = 500;
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const deleted = await prisma.post.delete({ where: { id } });
    if (!deleted) {
      const e = new Error('Post not found');
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
