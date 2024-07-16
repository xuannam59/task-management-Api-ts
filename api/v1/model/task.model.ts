import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  status: String,
  content: String,
  description: String,
  timeStart: Date,
  timeFinish: Date,
  createBy: String,
  listUsers: Array,
  taskParentId: String,
  deletedBy: String,
  deleted: {
    type: Boolean,
    default: true
  },
  deletedAt: Date,
}, {
  timestamps: true,
});

const Task = mongoose.model("Task", taskSchema, "tasks");

export default Task;