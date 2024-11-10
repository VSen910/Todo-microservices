const express = require('express');
const morgan = require('morgan');

const todoRouter = require('./routes/todo_router');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(todoRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    error: `Cannot find ${req.originalUrl}`,
  });
});

module.exports = app;
