const Task = require("../models/task");

module.exports = async function getTasks(req, res, next) {
  const tasks = await Task.aggregate([
    {
      $project: {
        list: "$shortList",
        title: 1,
        url: 1
      }
    }
  ]);
  res.status(200).json({
    tasks
  });
};