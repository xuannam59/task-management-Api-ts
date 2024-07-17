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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controller = __importStar(require("../controller/user.controller"));
const userValidate = __importStar(require("../validate/user.validate"));
const autheUserMiddleware = __importStar(require("../middleware/auth-user.middleware"));
const router = (0, express_1.Router)();
router.post("/register", userValidate.register, controller.register);
router.post("/login", userValidate.login, controller.login);
router.post("/password/forgot", controller.forgotPassword);
router.post("/password/otp", controller.otpPassword);
router.post("/password/reset", userValidate.resetPassword, controller.resetPassword);
router.get("/detail", autheUserMiddleware.requestAuth, controller.detail);
exports.userRouter = router;
