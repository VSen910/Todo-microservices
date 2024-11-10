const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/user_router');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    error: `Cannot find ${req.originalUrl}`,
  });
});

module.exports = app;
