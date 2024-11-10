const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  user: {
    type: String,
    required: [true, 'Todo must have a user'],
  },
  title: {
    type: String,
    required: [true, 'Todo must have a title'],
  },
  description: {
    type: String,
    default: '',
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
