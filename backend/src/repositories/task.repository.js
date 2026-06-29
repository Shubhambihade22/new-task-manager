const Task = require("../models/task.model");

const createTask = async (data) => {
  return Task.create(data);
};

const getTasks = async () => {
  return Task.find().sort({ createdOn: -1 });
};

const getTaskById = async (id) => {
  return Task.findById(id);
};

const updateTask = async (id, data) => {
  return Task.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteTask = async (id) => {
  return Task.findByIdAndDelete(id);
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
