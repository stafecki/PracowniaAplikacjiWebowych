const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.post('/', async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({ data: { email, name } });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { email, name } = req.body;
  try {
    const user = await prisma.user.update({ where: { id }, data: { email, name } });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const deleted = await prisma.user.delete({ where: { id } });
    res.json(deleted);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
