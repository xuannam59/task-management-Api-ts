"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelper = (objectPagination, query, countRecord) => {
    if (query.page) {
        objectPagination.currentPage = query.page;
    }
    if (query.limit) {
        objectPagination.limitItem = query.limit;
    }
    objectPagination.totalPage = Math.ceil(countRecord / objectPagination.limitItem);
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    return objectPagination;
};
exports.default = paginationHelper;
