import { Request, Response } from "express";
import Task from "../model/task.model";
import paginationHelper from "../helper/pagination.helper";
import searchHelper from "../helper/search.help";

// [GET] /api/v1/tasks/
export const index = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: boolean,
      status?: string,
      title?: string | RegExp,
    }

    const find: Find = {
      deleted: false,
    };

    // Status
    if (req.query.status) {
      find.status = req.query.status.toString();
    }

    // Sort
    const sort = {};

    if (req.query.sortKey && req.query.sortValue) {
      const sortKey = req.query.sortKey.toString();
      sort[sortKey] = req.query.sortValue;
    }

    // Pagination
    const innerPagination = {
      currentPage: 1,
      limitItem: 2,
    }
    const count = await Task.countDocuments({ deleted: false });
    const objectPagination = paginationHelper(innerPagination, req.query, count);
    // Search
    const objectSearch = searchHelper(req.query);

    if (req.query.keyword) {
      find.title = objectSearch.regex;
    }

    // Get Data
    const tasks = await Task
      .find(find)
      .sort(sort)
      .skip(objectPagination.skip)
      .limit(objectPagination.limitItem);

    res.json(tasks);
  } catch (error) {
    res.json({
      code: 400,
      message: "Error"
    })
  }
}
// [GET] /api/v1/tasks/detail/:id
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