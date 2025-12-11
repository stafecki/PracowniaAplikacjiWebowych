const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

function toInt(value) {
  if (value === undefined || value === null) return undefined;
  const n = Number(value);
  return Number.isInteger(n) ? n : NaN;
}

router.post('/', async (req, res, next) => {
  const { email, name } = req.body;
  if (!email) {
    const e = new Error('Email is required');
    e.status = 400;
    return next(e);
  }

  try {
    const user = await prisma.user.create({ data: { email, name } });
    return res.status(201).json(user);
  } catch (err) {
    if (err && err.code === 'P2002') {
      const e = new Error('Email already in use');
      e.status = 409;
      return next(e);
    }
    err.status = err.status || 500;
    return next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (err) {
    err.status = 500;
    return next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = toInt(req.params.id);
  if (Number.isNaN(id) || id <= 0) {
    const e = new Error('Invalid id');
    e.status = 400;
    return next(e);
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      const e = new Error('User not found');
      e.status = 404;
      return next(e);
    }
    return res.status(200).json(user);
  } catch (err) {
    err.status = 500;
    return next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const id = toInt(req.params.id);
  const { email, name } = req.body;

  if (Number.isNaN(id) || id <= 0) {
    const e = new Error('Invalid id');
    e.status = 400;
    return next(e);
  }
  if (email === undefined && name === undefined) {
    const e = new Error('No fields to update');
    e.status = 400;
    return next(e);
  }

  const data = {};
  if (email !== undefined) data.email = email;
  if (name !== undefined) data.name = name;

  try {
    const user = await prisma.user.update({ where: { id }, data });
    return res.status(200).json(user);
  } catch (err) {
    if (err && err.code === 'P2025') {
      const e = new Error('User not found');
      e.status = 404;
      return next(e);
    }
    if (err && err.code === 'P2002') {
      const e = new Error('Email already in use');
      e.status = 409;
      return next(e);
    }
    err.status = err.status || 500;
    return next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = toInt(req.params.id);
  if (Number.isNaN(id) || id <= 0) {
    const e = new Error('Invalid id');
    e.status = 400;
    return next(e);
  }

  try {
    const deleted = await prisma.user.delete({ where: { id } });
    return res.status(200).json(deleted);
  } catch (err) {
    if (err && err.code === 'P2025') {
      const e = new Error('User not found');
      e.status = 404;
      return next(e);
    }
    err.status = err.status || 500;
    return next(err);
  }
});

module.exports = router;
