const Task = require("../models/task");

exports.getTasks = async function getTasks(req, res, next) {
  try {
    const tasks = await Task.aggregate([{
      $project: {
        list: "$shortList",
        title: 1,
        url: 1,
        _id: 0
      }
    }]);
    res.status(200).json({
      tasks
    });
  } catch (error) {
    next(error);
  }
};

exports.getOneTask = async function getOneTask(req, res, next) {
  const {
    url
  } = req.params;
  try {
    const task = await Task
      .find({ url })
      .select("-__v -shortList");
    res.status(200).json({
      task: task[0]
    });
  } catch (error) {
    next(error);
  }
};