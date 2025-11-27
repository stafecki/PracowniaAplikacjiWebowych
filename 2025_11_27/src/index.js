const express = require('express');
const swaggerUi = require('swagger-ui-express');
const openApi = require('../openapi.json');
const accessLogger = require('./middleware/accessLogger');
const errorHandler = require('./middleware/errorHandler');

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const categoriesRouter = require('./routes/categories');
const commentsRouter = require('./routes/comments');

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApi));

app.use('/users',accessLogger, usersRouter);
app.use('/posts',accessLogger, postsRouter);
app.use('/categories',accessLogger, categoriesRouter);
app.use('/comments',accessLogger, commentsRouter);

app.use(errorHandler);
app.listen(3000, () => {
  console.log(`Server started on http://localhost:3000`);
});
