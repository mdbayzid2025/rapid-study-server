const todosService = require("./todosService");


class ToDoController {
  // Create a new ToDo
  async createToDo(req, res) {
    try {
      const todo = await todosService.createToDo(req.body);
      return res.status(201).json({ success: true, message: "ToDo created", data: todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  // Get all ToDos
  async getAllToDos(req, res) {
    try {
      const todos = await todosService.getAllToDos();
      return res.status(200).json({ success: true, data: todos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  // Get a specific ToDo by ID
  async getToDoById(req, res) {
    try {
      const todo = await todosService.getToDoById(req.params.id);
      if (!todo) {
        return res.status(404).json({ success: false, message: "ToDo not found" });
      }
      return res.status(200).json({ success: true, data: todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  // Update a ToDo
  async updateToDo(req, res) {
    try {
      const todo = await todosService.updateToDo(req.params.id, req.body);
      if (!todo) {
        return res.status(404).json({ success: false, message: "ToDo not found" });
      }
      return res.status(200).json({ success: true, message: "ToDo updated", data: todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }

  // Delete a ToDo
  async deleteToDo(req, res) {
    try {
      const deleted = await todosService.deleteToDo(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "ToDo not found" });
      }
      return res.status(200).json({ success: true, message: "ToDo deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  }
}

module.exports = new ToDoController();
