const TaskService = require("../services/task.service");

const taskService = new TaskService();

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskService.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const task = await taskService.create(req.body, req.file);

    res.status(201).json(task);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.update(req.params.id, req.body, req.file);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await taskService.delete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const markTaskDone = async (req, res) => {
  try {
    const task = await taskService.markTaskDone(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const downloadFile = async (req, res) => {
  try {
    const file = await taskService.getFile(req.params.id);

    if (!file) {
      return res.status(404).json({
        message: "No file found",
      });
    }

    res.set({
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="${file.fileName}"`,
    });

    res.send(file.data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  markTaskDone,
  downloadFile,
};
