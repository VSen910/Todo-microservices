const express = require('express');
const morgan = require('morgan');
const proxy = require('express-http-proxy');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const todo = proxy('http://todo:8081');
const user = proxy('http://user:8082');

app.use('/api/v1/todos', todo);
app.use('/api/v1/users', user);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    error: `Cannot find ${req.originalUrl}`,
  });
});

module.exports = app;
