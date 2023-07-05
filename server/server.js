const express = require("express");
const cors = require("cors");
const DBconnection = require("./database/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB
DBconnection();

app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
