const Task = require("../models/taskModel");
const User = require("../models/userModel");
const TaskController = {
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.find().populate("assignedUser", "name");
            res.json({ tasks });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    createTask: async (req, res) => {
        try {
            const { title, description, dueDate, status, assignedUser } =
                req.body;

            // Create a new task
            const task = await Task.create({
                title,
                description,
                dueDate,
                status,
                assignedUser,
            });
            const user = await User.findByIdAndUpdate(req.user._id, {
                $push: { createdTask: task._id },
            });
            res.status(201).json({ task });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getAllCreatedTaskById: async (req, res) => {
        try {
            const id = req.user._id;
            // Find the task by ID
            const createdTask = await User.findById(id).populate("createdTask");
            if (!createdTask) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.json({ createdTask });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    updateTask: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, dueDate, status, assignedUser } =
                req.body;

            // Find the task by ID and update it
            const task = await Task.findByIdAndUpdate(
                id,
                {
                    title,
                    description,
                    dueDate,
                    status,
                    assignedUser,
                },
                { new: true }
            ).populate("assignedUser");
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.json({ task });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    deleteTask: async (req, res) => {
        try {
            const { id } = req.params;

            const user = await User.findByIdAndUpdate(req.user._id, {
                $pull: { createdTask: id },
            });

            // Find the task by ID and delete it
            const task = await Task.findByIdAndDelete(id);
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.json({ message: "Task deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};

module.exports = TaskController;
