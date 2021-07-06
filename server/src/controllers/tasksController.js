const Task = require('../model/taskModel');

function tasksController() {
  async function getAll(req, res) {
    const tasks = await Task.find({});
    res.status(200);
    res.json(tasks);
  }

  async function createOne(req, res) {
    const newTask = new Task(req.body);
    try {
      await newTask.save();
      res.status(200);
      res.json(newTask);
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  }

  async function getById(req, res) {
    try {
      const taskById = await Task.findById(req.params.taskId);
      res.status(200);
      res.json(taskById);
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  }

  async function updateById(req, res) {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.taskId,
        req.body,
        { new: true }
      );
      res.status(200);
      res.json(updatedTask);
    } catch (error) {
      res.status(404);
      res.send(error);
    }
  }

  async function deleteById(req, res) {
    try {
      const deleteTask = await Task.findByIdAndDelete(req.params.taskId);
      res.status(200);
      res.json(deleteTask);
    } catch (error) {
      res.send(error);
      res.status(404);
    }
  }

  return {
    getAll,
    createOne,
    getById,
    updateById,
    deleteById
  };
}

module.exports = tasksController;
