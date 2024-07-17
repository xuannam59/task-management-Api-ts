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
exports.resetPassword = exports.login = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../model/user.model"));
const emailFormat = (email) => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.toLowerCase().match(regexEmail);
};
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (!emailFormat(email)) {
        res.json({
            code: 400,
            message: "Incorrect email format .Please re-enter email!"
        });
        return;
    }
    if (user) {
        res.json({
            code: 400,
            message: "Email already  exists .Please re-enter email!"
        });
        return;
    }
    if (req.body.password !== req.body.confirmPassword) {
        res.json({
            code: 400,
            message: "Confirm password not equal to password. Please re-enter!"
        });
        return;
    }
    next();
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const user = yield user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        res.json({
            code: 400,
            message: "Email is incorrect!"
        });
        return;
    }
    if ((0, md5_1.default)(password) !== user.password) {
        res.json({
            code: 400,
            message: "Password is incorrect!"
        });
        return;
    }
    next();
});
exports.login = login;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const user = yield user_model_1.default.findOne({
        token: token,
        deleted: false,
    });
    if (!user) {
        res.json({
            code: 400,
            message: "Error Token code. Please contact with adminstrator"
        });
        return;
    }
    if (password !== confirmPassword) {
        res.json({
            code: 400,
            message: "Confirm Password not equal to password. Please re-enter!"
        });
        return;
    }
    if ((0, md5_1.default)(password) === user.password) {
        res.json({
            code: 400,
            message: "Password is the same as old password. Please enter new password!"
        });
        return;
    }
    next();
});
exports.resetPassword = resetPassword;
