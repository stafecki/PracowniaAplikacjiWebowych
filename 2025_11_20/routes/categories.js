const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const cat = await prisma.category.create({ data: { name } });
    res.status(201).json(cat);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/', async (req, res) => {
  const cats = await prisma.category.findMany();
  res.json(cats);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const cat = await prisma.category.findUnique({ where: { id } });
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  res.json(cat);
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  try {
    const cat = await prisma.category.update({ where: { id }, data: { name } });
    res.json(cat);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const deleted = await prisma.category.delete({ where: { id } });
    res.json(deleted);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
