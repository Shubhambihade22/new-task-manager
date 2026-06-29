const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["TODO", "DONE"],
      default: "TODO",
    },

    deadline: {
      type: Date,
      required: true,
    },

    linkedFile: {
      data: {
        type: Buffer,
      },
      contentType: {
        type: String,
      },
      fileName: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
