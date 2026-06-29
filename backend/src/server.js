const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const TaskService = require("./services/task.service");

const taskService = new TaskService();

const taskController = require("./controllers/task.controller");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/task.routes");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/tasks", taskRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Task Manager API Running");
});

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
