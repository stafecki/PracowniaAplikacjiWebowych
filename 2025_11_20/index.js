const express = require('express');
const { PrismaClient } = require('@prisma/client');
const swaggerUi = require('swagger-ui-express');
const openApi = require('./openapi.json');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApi));

app.post('/users', async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({ data: { email, name } });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { email, name } = req.body;
  try {
    const user = await prisma.user.update({ where: { id }, data: { email, name } });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const deleted = await prisma.user.delete({ where: { id } });
    res.json(deleted);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/posts', async (req, res) => {
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

app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

app.put('/posts/:id', async (req, res) => {
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

app.delete('/posts/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const deleted = await prisma.post.delete({ where: { id } });
    res.json(deleted);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/categories', async (req, res) => {
  const { name } = req.body;
  try {
    const cat = await prisma.category.create({ data: { name } });
    res.status(201).json(cat);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/categories', async (req, res) => {
  const cats = await prisma.category.findMany();
  res.json(cats);
});

app.get('/categories/:id', async (req, res) => {
  const id = Number(req.params.id);
  const cat = await prisma.category.findUnique({ where: { id } });
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  res.json(cat);
});

app.put('/categories/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  try {
    const cat = await prisma.category.update({ where: { id }, data: { name } });
    res.json(cat);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/categories/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const deleted = await prisma.category.delete({ where: { id } });
    res.json(deleted);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post('/comments', async (req, res) => {
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

app.get('/comments', async (req, res) => {
  const comments = await prisma.comment.findMany();
  res.json(comments);
});

app.get('/comments/:id', async (req, res) => {
  const id = Number(req.params.id);
  const c = await prisma.comment.findUnique({ where: { id } });
  if (!c) return res.status(404).json({ error: 'Comment not found' });
  res.json(c);
});

app.put('/comments/:id', async (req, res) => {
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

app.delete('/comments/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const deleted = await prisma.comment.delete({ where: { id } });
    res.json(deleted);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log(`Server started on http://localhost:3000`);
});
