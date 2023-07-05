const express = require("express");
const router = express.Router();
const TaskController = require("../controller/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeMiddleware = require("../middleware/authorizeMiddleware");

// Get all tasks
router.get(
    "/",
    authMiddleware,
    authorizeMiddleware,
    TaskController.getAllTasks
);

// Create a new task
router.post("/", authMiddleware, TaskController.createTask);

// Get a all assigned task by user
router.get(
    "/createdTask",
    authMiddleware,
    TaskController.getAllCreatedTaskById
);

// Update a task
router.put("/:id", authMiddleware, TaskController.updateTask);

// Delete a task
router.delete("/:id", authMiddleware, TaskController.deleteTask);

module.exports = router;
