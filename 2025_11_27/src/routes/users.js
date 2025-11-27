const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

router.post('/', async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({ data: { email, name } });
    res.status(201).json(user);
  } catch (e) {
    e.status = 500
    next(e)
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  }
  catch (e) {
    e.status = 500
    next(e)
  }
});

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  try{
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user){
      const e = new Error('User not found');
      e.status = 404;
      return next(e);
    }
    res.json(user);
  }
  catch (e) {
    e.status = 500
    next(e)
  }
});

router.put('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const { email, name } = req.body;
  try {
    const user = await prisma.user.update({ where: { id }, data: { email, name } });
    if (!user){
      const e = new Error('User not found');
      e.status = 404;
      return next(e);
    }
    res.json(user);
  } catch (e) {
    e.status = 500
    next(e)
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const deleted = await prisma.user.delete({ where: { id } });
    if (!deleted) {
      const e = new Error('User not found');
      e.status = 404;
      return next(e);
    }
    res.json(deleted);
  } catch (e) {
    e.status = 500
    next(e)
  }
});

module.exports = router;
