const Subject = require("../../Schema/SubjectSchema");
const ToDo = require("../../Schema/TodoSchema");

class ToDoService {
  // Create a new ToDo
  async createToDo(data) {
    const todo = await ToDo.create(data);

    // Optionally: Add ToDo ID to subject's todos array
    await Subject.findByIdAndUpdate(
      data.subject,
      { $push: { todos: todo._id } },
      { new: true }
    );

    return todo;
  }

  // Get all ToDos
  async getAllToDos() {
    return await ToDo.find()
      .populate("subject")  // Populate subject data
      .sort({ createdAt: -1 });  // Sort by created date (descending)
  }

  // Get a ToDo by ID
  async getToDoById(id) {
    return await ToDo.findById(id).populate("subject");
  }

  // Update a ToDo
  async updateToDo(id, data) {
    try {
      const updatedToDo = await ToDo.findByIdAndUpdate(id, data, { new: true });
      return updatedToDo;
    } catch (error) {
      throw new Error(`Error updating ToDo: ${error.message}`);
    }
  }

  // Delete a ToDo
  async deleteToDo(id) {
    try {
      const deletedToDo = await ToDo.findByIdAndDelete(id);
      return deletedToDo;
    } catch (error) {
      throw new Error(`Error deleting ToDo: ${error.message}`);
    }
  }
}

module.exports = new ToDoService();
