import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  status: String,
  content: String,
  description: String,
  timeStart: Date,
  timeFinish: Date,
  listUsers: Array,
  taskParentId: String,
  createBy: String,
  deletedBy: String,
  changeAt: [
    {
      title: String,
      time: Date,
      by: String
    }
  ],
  createAt: Date,
  deleteAt: Date,
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true,
});

const Task = mongoose.model("Task", taskSchema, "tasks");

export default Task;