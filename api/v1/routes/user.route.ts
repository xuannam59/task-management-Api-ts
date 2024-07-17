import { Router } from "express";
import * as controller from "../controller/user.controller";
import * as userValidate from "../validate/user.validate";

const router = Router();

router.post("/register", userValidate.register, controller.register);

router.post("/login", userValidate.login, controller.login);

router.post("/password/forgot", controller.forgotPassword);

router.post("/password/otp", controller.otpPassword);

router.post("/password/reset", userValidate.resetPassword, controller.resetPassword);

export const userRouter = router;