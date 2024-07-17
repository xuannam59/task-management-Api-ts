"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.detail = exports.resetPassword = exports.otpPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../model/user.model"));
const forgot_password_model_1 = __importDefault(require("../model/forgot-password.model"));
const generateHelper = __importStar(require("../../../helper/generate.helper"));
const sendMail_helper_1 = __importDefault(require("../../../helper/sendMail.helper"));
const catchError = (res) => {
    res.json({
        code: 400,
        message: "Error"
    });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.password = (0, md5_1.default)(req.body.password);
        const data = req.body;
        delete data.confirmPassword;
        data.token = generateHelper.generateRandomChar(25);
        const user = new user_model_1.default(data);
        yield user.save();
        res.json({
            code: 200,
            message: "OK"
        });
    }
    catch (error) {
        catchError(res);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield user_model_1.default.findOne({
            email: email
        });
        res.cookie("token", user.token);
        res.json({
            code: 200,
            message: "Login Success!",
            token: user.token
        });
    }
    catch (error) {
        catchError(res);
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
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
        const timeStamp = 3;
        const otp = generateHelper.generateRandomNumber(6);
        const data = {
            email: email,
            otp: otp,
            expireAt: Date.now() + timeStamp * 60 * 1000,
        };
        const forgot = new forgot_password_model_1.default(data);
        yield forgot.save();
        const subject = "OPT code to confirm fogotten password!";
        const html = `<p> Your OTP code is : <strong>${data.otp}</strong> , the code lasts for 3 minutes. Do not share with anyone </p>`;
        (0, sendMail_helper_1.default)(email, subject, html);
        res.json({
            code: 200,
            messasge: "OTP code has been sent to your email. Please check your email!"
        });
    }
    catch (error) {
        catchError(res);
    }
});
exports.forgotPassword = forgotPassword;
const otpPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otp = req.body.otp;
        const email = req.body.email;
        const forgot = yield forgot_password_model_1.default.findOne({
            email: email,
            otp: otp
        });
        if (!forgot) {
            res.json({
                code: 400,
                message: "OTP code is incorrect!"
            });
            return;
        }
        ;
        const user = yield user_model_1.default.findOne({
            email: email
        });
        const token = user.token;
        res.cookie("token", token);
        res.json({
            code: 200,
            message: "OTP code is correct!",
            token: token
        });
    }
    catch (error) {
        catchError(res);
    }
});
exports.otpPassword = otpPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const password = (0, md5_1.default)(req.body.password);
        console.log(token);
        yield user_model_1.default.updateOne({
            token: token
        }, {
            password: password
        });
        res.json({
            code: 200,
            message: "Password reset successful!",
        });
    }
    catch (error) {
        catchError(res);
    }
});
exports.resetPassword = resetPassword;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const user = yield user_model_1.default.findOne({
            token: token,
        }).select("-password");
        res.json({
            code: 200,
            message: "Get user information success!",
            user: user
        });
    }
    catch (error) {
        catchError(res);
    }
});
exports.detail = detail;
