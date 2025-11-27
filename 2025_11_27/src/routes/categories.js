const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

router.post('/', async (req, res, next) => {
  const { name } = req.body;
  try {
    const cat = await prisma.category.create({ data: { name } });
    res.status(201).json(cat);
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const cats = await prisma.category.findMany();
    res.json(cats);
  } catch (e) {
    e.status = 500;
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const cat = await prisma.category.findUnique({ where: { id } });
    if (!cat) {
      const e = new eor('Category not found');
      e.status = 404;
      return next(e);
    }
    res.json(cat);
  } catch (e) {
    e.status = 500;
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  try {
    const cat = await prisma.category.update({ where: { id }, data: { name } });
    if (!cat) {
      const e = new eor('Category not found');
      e.status = 404;
      return next(e);
    }
    res.json(cat);
  } catch (e) {
    e.status = 500;
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const deleted = await prisma.category.delete({ where: { id } });
    if (!deleted) {
      const e = new eor('Category not found');
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
