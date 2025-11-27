const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.post('/', async (req, res) => {
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
    res.status(400).json({ error: e.message });
  }
});

router.get('/', async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

router.put('/:id', async (req, res) => {
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
    res.json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const deleted = await prisma.post.delete({ where: { id } });
    res.json(deleted);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
