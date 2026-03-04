const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const openApi = require('../openapi.json');
const accessLogger = require('./middleware/accessLogger');
const errorHandler = require('./middleware/errorHandler');

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const categoriesRouter = require('./routes/categories');
const commentsRouter = require('./routes/comments');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApi));
app.use(accessLogger);

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/categories', categoriesRouter);
app.use('/comments', commentsRouter);

app.use(errorHandler);
app.listen(3000, () => {
  console.log(`Server started on http://localhost:3000`);
});
