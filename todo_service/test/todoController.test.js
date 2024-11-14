const todoController = require('../controllers/todo_controller');
const Todo = require('../models/todo_model');

// Mock the Mongoose model
jest.mock('../models/todo_model');

describe('Todo Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { userEmail: 'test@example.com' };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('getAllTodos', () => {
    it('should return all todos for the user', async () => {
      const todos = [{ title: 'Test Todo', user: req.userEmail }];
      Todo.find.mockResolvedValue(todos);

      await todoController.getAllTodos(req, res, next);

      expect(Todo.find).toHaveBeenCalledWith({ user: req.userEmail });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 'success', todos });
    });

    it('should handle errors', async () => {
      Todo.find.mockRejectedValue(new Error('Database error'));

      await todoController.getAllTodos(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', error: 'Database error' });
    });
  });

  describe('getTodo', () => {
    it('should return a specific todo for the user', async () => {
      const todo = { _id: '123', title: 'Test Todo', user: req.userEmail };
      req.params = { id: '123' };
      Todo.findById.mockResolvedValue(todo);

      await todoController.getTodo(req, res, next);

      expect(Todo.findById).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 'success', todo });
    });

    it('should return 404 if todo not found or user is not authorized', async () => {
      req.params = { id: '123' };
      Todo.findById.mockResolvedValue(null);

      await todoController.getTodo(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', error: 'Cannot find todo' });
    });

    it('should handle errors', async () => {
      req.params = { id: '123' };
      Todo.findById.mockRejectedValue(new Error('Database error'));

      await todoController.getTodo(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', error: 'Database error' });
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      req.body = { title: 'New Todo', description: 'New description' };
      const newTodo = { title: 'New Todo', description: 'New description', user: req.userEmail };
      Todo.create.mockResolvedValue(newTodo);

      await todoController.createTodo(req, res, next);

      expect(Todo.create).toHaveBeenCalledWith({
        user: req.userEmail,
        title: 'New Todo',
        description: 'New description',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ status: 'success', todo: newTodo });
    });

    it('should handle errors', async () => {
      req.body = { title: 'New Todo', description: 'New description' };
      Todo.create.mockRejectedValue(new Error('Database error'));

      await todoController.createTodo(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', error: 'Database error' });
    });
  });

  describe('updateTodo', () => {
    it('should update a todo and return the updated todo', async () => {
      req.params = { id: '123' };
      req.body = { title: 'Updated Todo' };
      const updatedTodo = { _id: '123', title: 'Updated Todo', user: req.userEmail };
      Todo.findByIdAndUpdate.mockResolvedValue(updatedTodo);

      await todoController.updateTodo(req, res, next);

      expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith('123', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 'success', todo: updatedTodo });
    });

    it('should return 404 if todo not found', async () => {
      req.params = { id: '123' };
      req.body = { title: 'Updated Todo' };
      Todo.findByIdAndUpdate.mockResolvedValue(null);

      await todoController.updateTodo(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', error: 'Cannot find todo' });
    });

    it('should handle errors', async () => {
      req.params = { id: '123' };
      Todo.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

      await todoController.updateTodo(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', error: 'Database error' });
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo and return 204', async () => {
      req.params = { id: '123' };
      Todo.findByIdAndDelete.mockResolvedValue({ _id: '123', user: req.userEmail });

      await todoController.deleteTodo(req, res, next);

      expect(Todo.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({ status: 'success' });
    });

    it('should return 404 if todo not found', async () => {
      req.params = { id: '123' };
      Todo.findByIdAndDelete.mockResolvedValue(null);

      await todoController.deleteTodo(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', error: 'Cannot find todo' });
    });

    it('should handle errors', async () => {
      req.params = { id: '123' };
      Todo.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

      await todoController.deleteTodo(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ status: 'fail', error: 'Database error' });
    });
  });
});
