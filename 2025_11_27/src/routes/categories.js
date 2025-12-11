const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

router.post('/', async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    const e = new Error('Name is required');
    e.status = 400;
    return next(e);
  }

  try {
    const cat = await prisma.category.create({ data: { name } });
    return res.status(201).json(cat);
  } catch (e) {
    e.status = e.status || 500;
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const cats = await prisma.category.findMany();
    return res.status(200).json(cats);
  } catch (e) {
    e.status = 500;
    next(e);
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
    const cat = await prisma.category.findUnique({ where: { id } });
    if (!cat) {
      const e = new Error('Category not found');
      e.status = 404;
      return next(e);
    }
    return res.status(200).json(cat);
  } catch (e) {
    e.status = 500;
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    const e = new Error('Invalid id');
    e.status = 400;
    return next(e);
  }
  if (!name) {
    const e = new Error('Name is required');
    e.status = 400;
    return next(e);
  }

  try {
    const cat = await prisma.category.update({ where: { id }, data: { name } });
    return res.status(200).json(cat);
  } catch (e) {
    if (e && e.code === 'P2025') {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }
    e.status = 500;
    next(e);
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
    const deleted = await prisma.category.delete({ where: { id } });
    return res.status(200).json(deleted);
  } catch (e) {
    if (e && e.code === 'P2025') {
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }
    e.status = 500;
    next(e);
  }
});

module.exports = router;
