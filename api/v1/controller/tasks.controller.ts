import { Request, Response } from "express";
import Task from "../model/task.model";

export const index = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({
      deleted: false,
    });

    res.json(tasks);
  } catch (error) {
    res.json({
      code: 400,
      message: "Error"
    })
  }
}

export const detail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const task = await Task.findOne({
      _id: id,
      deleted: false
    });
    res.json(task);
  } catch (error) {
    res.json({
      code: 400,
      message: "Error"
    });
  }
}