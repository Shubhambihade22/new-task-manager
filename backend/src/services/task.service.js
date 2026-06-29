const Task = require("../models/task.model");

class TaskService {
  find = async () => {
    return await Task.find().sort({ createdAt: -1 });
  };

  findById = async (id) => {
    return await Task.findById(id);
  };

  create = async (body, file) => {
    const task = new Task({
      title: body.title,
      description: body.description,
      deadline: body.deadline,
      status: body.status || "TODO",
      linkedFile: file
        ? {
            data: file.buffer,
            contentType: file.mimetype,
            fileName: file.originalname,
          }
        : undefined,
    });

    return await task.save();
  };

  update = async (id, body, file) => {
    const updateData = {
      title: body.title,
      description: body.description,
      deadline: body.deadline,
      status: body.status,
    };

    if (file) {
      updateData.linkedFile = {
        data: file.buffer,
        contentType: file.mimetype,
        fileName: file.originalname,
      };
    }

    return await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  };

  delete = async (id) => {
    return await Task.findByIdAndDelete(id);
  };

  markTaskDone = async (id) => {
    return await Task.findByIdAndUpdate(id, { status: "DONE" }, { new: true });
  };

  getFile = async (id) => {
    const task = await Task.findById(id);

    if (!task || !task.linkedFile || !task.linkedFile.data) {
      return null;
    }

    return task.linkedFile;
  };
}

module.exports = TaskService;
