"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
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
const Task = mongoose_1.default.model("Task", taskSchema, "tasks");
exports.default = Task;
