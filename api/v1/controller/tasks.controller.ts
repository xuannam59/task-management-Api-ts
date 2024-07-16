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

// [PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const status: string = req.body.status;
    await Task.updateOne({
      _id: id,
    }, {
      status: status
    })
    res.json({
      code: 200,
      message: "Change status success!"
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Error"
    });
  }
}

// [PATCH] /api/v1/tasks/change-multi
export const changeMultip = async (req: Request, res: Response) => {
  try {
    enum Key {
      STATUS = "status",
      DELETE = "delete"
    }
    const ids: string[] = req.body.id;
    const key: string = req.body.key;
    const value: string = req.body.value;

    switch (key) {
      case Key.STATUS:
        await Task.updateMany({
          _id: { $in: ids }
        }, {
          status: value
        });
        res.json({
          code: 200,
          message: "Change status success!"
        });
        break;
      case Key.DELETE:
        await Task.updateMany({
          _id: { $in: ids }
        }, {
          deleted: true,
          deletedAt: new Date(),
        });
        res.json({
          code: 200,
          message: "Delete Task success!"
        });
        break;
      default:
        res.json({
          code: 400,
          message: "Not exist feature!"
        });
        break;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "error"
    });
  }
}

// [POST] /aip/v1/tasks/create
export const create = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json({
      code: 200,
      message: "Create success",
      task: task
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Error"
    });
  }
}

// [POST] /api/v1/tasks/edit/:id
export const edit = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const task = await Task.updateOne({
      _id: id
    }, req.body);

    res.json({
      code: 200,
      message: "Edit items success!",
      task: task
    })
  } catch (error) {
    res.json({
      code: 400,
      message: "Error"
    })
  }
}

// [DELETE] /api/v1/tasks/delete/:id
export const deleteOne = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await Task.updateOne({
      _id: id
    }, {
      deleted: true,
      deletedAt: new Date()
    });
    res.json({
      code: 200,
      message: "Delete item success!"
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "ERROR!"
    })
  }
}

// [PATCH] /api/v1/tasks/undo/:id
export const undo = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await Task.updateOne({
      _id: id
    }, {
      deleted: false
    });
    res.json({
      code: 200,
      message: "Undo item success!"
    })
  } catch (error) {
    res.json({
      code: 200,
      message: "Error!"
    })
  }
}