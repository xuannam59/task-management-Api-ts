"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.undo = exports.deleteOne = exports.edit = exports.create = exports.changeMultip = exports.changeStatus = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../model/task.model"));
const pagination_helper_1 = __importDefault(require("../../../helper/pagination.helper"));
const search_help_1 = __importDefault(require("../../../helper/search.help"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.id;
        const find = {
            deleted: false,
            $or: [
                {
                    createBy: userId
                },
                {
                    listUsers: userId
                }
            ]
        };
        if (req.query.status) {
            find.status = req.query.status.toString();
        }
        const sort = {};
        if (req.query.sortKey && req.query.sortValue) {
            const sortKey = req.query.sortKey.toString();
            sort[sortKey] = req.query.sortValue;
        }
        const innerPagination = {
            currentPage: 1,
            limitItem: 2,
        };
        const count = yield task_model_1.default.countDocuments({ deleted: false });
        const objectPagination = (0, pagination_helper_1.default)(innerPagination, req.query, count);
        const objectSearch = (0, search_help_1.default)(req.query);
        if (req.query.keyword) {
            find.title = objectSearch.regex;
        }
        const tasks = yield task_model_1.default
            .find(find)
            .sort(sort)
            .skip(objectPagination.skip)
            .limit(objectPagination.limitItem);
        res.json(tasks);
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Error"
        });
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const task = yield task_model_1.default.findOne({
            _id: id,
            deleted: false
        });
        res.json(task);
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Error"
        });
    }
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const userId = res.locals.user.id;
        yield task_model_1.default.updateOne({
            _id: id,
        }, {
            status: status,
            $push: {
                changeAt: {
                    titel: "Change status",
                    time: Date.now(),
                    by: userId
                }
            }
        });
        res.json({
            code: 200,
            message: "Change status success!"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Error"
        });
    }
});
exports.changeStatus = changeStatus;
const changeMultip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let Key;
        (function (Key) {
            Key["STATUS"] = "status";
            Key["DELETE"] = "delete";
        })(Key || (Key = {}));
        const ids = req.body.id;
        const key = req.body.key;
        const value = req.body.value;
        const userId = res.locals.user.id;
        switch (key) {
            case Key.STATUS:
                yield task_model_1.default.updateMany({
                    _id: { $in: ids }
                }, {
                    status: value,
                    $push: {
                        changeAt: {
                            titel: "Change status",
                            time: Date.now(),
                            by: userId
                        }
                    }
                });
                res.json({
                    code: 200,
                    message: "Change status success!"
                });
                break;
            case Key.DELETE:
                yield task_model_1.default.updateMany({
                    _id: { $in: ids }
                }, {
                    deleted: true,
                    deletedAt: new Date(),
                    deletedBy: userId
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
    }
    catch (error) {
        res.json({
            code: 400,
            message: "error"
        });
    }
});
exports.changeMultip = changeMultip;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.id;
        req.body.createAt = Date.now();
        req.body.createBy = userId;
        const task = new task_model_1.default(req.body);
        yield task.save();
        res.json({
            code: 200,
            message: "Create success",
            task: task
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Error"
        });
    }
});
exports.create = create;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userId = res.locals.user.id;
        req.body.$push = {
            changeAt: {
                title: "Edit task",
                time: Date.now(),
                by: userId
            }
        };
        yield task_model_1.default.updateOne({
            _id: id
        }, req.body);
        const task = yield task_model_1.default.findOne({
            _id: id
        });
        res.json({
            code: 200,
            message: "Edit items success!",
            task: task
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Error"
        });
    }
});
exports.edit = edit;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.id;
        const id = req.params.id;
        yield task_model_1.default.updateOne({
            _id: id
        }, {
            deleted: true,
            deleteAt: new Date(),
            deletedBy: userId
        });
        res.json({
            code: 200,
            message: "Delete item success!"
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "ERROR!"
        });
    }
});
exports.deleteOne = deleteOne;
const undo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield task_model_1.default.updateOne({
            _id: id
        }, {
            deleted: false
        });
        res.json({
            code: 200,
            message: "Undo item success!"
        });
    }
    catch (error) {
        res.json({
            code: 200,
            message: "Error!"
        });
    }
});
exports.undo = undo;
