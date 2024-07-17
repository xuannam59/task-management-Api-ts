"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchHelper = (query) => {
    const objectSearch = {
        keyword: "",
    };
    if (query.keyword) {
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;
    }
    return objectSearch;
};
exports.default = searchHelper;
