const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.post('/', async (req, res) => {
  const { author, content, postId, userId } = req.body;
  if (!author || !content || !postId) return res.status(400).json({ error: 'author, content and postId required' });
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
    res.status(400).json({ error: e.message });
  }
});

router.get('/', async (req, res) => {
  const comments = await prisma.comment.findMany();
  res.json(comments);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const c = await prisma.comment.findUnique({ where: { id } });
  if (!c) return res.status(404).json({ error: 'Comment not found' });
  res.json(c);
});

router.put('/:id', async (req, res) => {
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
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const deleted = await prisma.comment.delete({ where: { id } });
    res.json(deleted);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
