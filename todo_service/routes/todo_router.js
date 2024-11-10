const express = require('express');

const todoController = require('../controllers/todo_controller');
const auth = require('../middlewares/auth_middleware');

const router = express.Router();

router
  .route('/')
  .get(auth, todoController.getAllTodos)
  .post(auth, todoController.createTodo);

router
  .route('/:id')
  .get(auth, todoController.getTodo)
  .patch(auth, todoController.updateTodo)
  .delete(auth, todoController.deleteTodo);

module.exports = router;
