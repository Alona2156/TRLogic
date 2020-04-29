const Task = require("../models/task");

module.exports = async function editTask(req, res, next) {
  const {
    list,
    url
  } = req.body;
  try {
    let task = await Task.find({ url });
    // eslint-disable-next-line prefer-destructuring
    task = task[0];
    task.list = list;
    task.shortList = list.slice(0, 2);
    await task.save();
    res.status(200).json({
      task
    });
  } catch (error) {
    next(error);
  }
};