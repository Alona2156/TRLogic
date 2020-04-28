const Task = require("../models/task");

module.exports = async function createTask(req, res, next) {
  const {
    task
  } = req.body;
  try {
    const newTask = new Task(
      task
    );
    newTask.save();
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};