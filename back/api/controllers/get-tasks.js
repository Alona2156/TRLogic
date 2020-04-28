module.exports = function getTasks(req, res, next) {
  res.status(200).json({tasks: ["task 1"]});
}