const Task = require("../models/taskModel");
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
            const { title, description, dueDate, assignedUser } = req.body;

            // Create a new task
            const task = await Task.create({
                title,
                description,
                dueDate,
                assignedUser,
            });

            res.status(201).json({ task });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getTaskById: async (req, res) => {
        try {
            const { id } = req.params;

            // Find the task by ID
            const task = await Task.findById(id).populate(
                "assignedUser",
                "name"
            );
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            res.json({ task });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    updateTask: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, dueDate, assignedUser } = req.body;

            // Find the task by ID and update it
            const task = await Task.findByIdAndUpdate(
                id,
                {
                    title,
                    description,
                    dueDate,
                    assignedUser,
                },
                { new: true }
            ).populate("assignedUser", "name");
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
