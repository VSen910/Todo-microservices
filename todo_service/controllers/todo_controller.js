const Todo = require('../models/todo_model');

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.userEmail });

    res.status(200).json({
      status: 'success',
      todos,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo || !(todo.user === req.userEmail)) {
      return res.status(404).json({
        status: 'fail',
        error: 'Cannot find todo',
      });
    }

    res.status(200).json({
      status: 'success',
      todo,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const { title, description = '' } = req.body;
    const user = req.userEmail;
    const todo = await Todo.create({
      user,
      title,
      description,
    });

    res.status(201).json({
      status: 'success',
      todo,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        status: 'fail',
        error: 'Cannot find todo',
      });
    }

    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });

    if (!todo) {
      return res.status(404).json({
        status: 'fail',
        error: 'Cannot find todo',
      });
    }

    res.status(200).json({
      status: 'success',
      todo,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};
