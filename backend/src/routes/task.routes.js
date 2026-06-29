const express = require("express");
const router = express.Router();

const upload = require("../config/multerConfig");

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  markTaskDone,
  downloadFile,
} = require("../controllers/task.controller");

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.post("/", upload.single("linkedFile"), createTask);

router.put("/:id", upload.single("linkedFile"), updateTask);

router.patch("/:id/done", markTaskDone);

router.delete("/:id", deleteTask);

router.get("/:id/download", downloadFile);

module.exports = router;
