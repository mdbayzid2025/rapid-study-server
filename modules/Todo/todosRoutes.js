const express = require('express');
const todosController = require('./todosController');

const todosRouter = express.Router();

// Create a new ToDo
todosRouter.post('/', todosController.createToDo);

// Get all ToDos
todosRouter.get('/', todosController.getAllToDos);

// Get a specific ToDo by ID
todosRouter.get('/:id', todosController.getToDoById);

// Update a ToDo
todosRouter.patch('/:id', todosController.updateToDo);

// Delete a ToDo
todosRouter.delete('/:id', todosController.deleteToDo);

module.exports = todosRouter;
