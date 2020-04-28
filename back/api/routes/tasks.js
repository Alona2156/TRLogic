const express = require("express");
const router = express.Router();

const { getTasks, getOneTask } = require("../controllers/get-tasks");
const createTask = require("../controllers/create-task");
const editTask = require("../controllers/edit-task");
const deleteTask = require("../controllers/delete-task");

router.get("/:url", getOneTask);
router.get("/", getTasks);
router.post("/", createTask);
router.put("/", editTask);
router.delete("/:url", deleteTask);

module.exports = router;