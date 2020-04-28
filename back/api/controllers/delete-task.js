const Task = require("../models/task");

module.exports = async function deleteTask(req, res, next) {
  const { url } = req.params;
  try {
    await Task.deleteOne({ url });
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};