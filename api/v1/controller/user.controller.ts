import { Response, Request } from "express";
import md5 from "md5";
// Database
import User from "../model/user.model";
import Forgot from "../model/forgot-password.model";
// Helper
import * as generateHelper from "../../../helper/generate.helper";
import sendMailHelper from "../../../helper/sendMail.helper";

const catchError = (res: Response) => {
  res.json({
    code: 400,
    message: "Error"
  });
}

// [POST] /api/v1/user/register
export const register = async (req: Request, res: Response) => {
  try {
    req.body.password = md5(req.body.password);
    const data = req.body;
    delete data.confirmPassword;
    data.token = generateHelper.generateRandomChar(25);

    const user = new User(data);
    await user.save();

    res.json({
      code: 200,
      message: "OK"
    })
  } catch (error) {
    catchError(res);
  }
}

// [POST] /api/v1/user/login
export const login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const user = await User.findOne({
      email: email
    });
    res.cookie("token", user.token);
    res.json({
      code: 200,
      message: "Login Success!",
      token: user.token
    })
  } catch (error) {
    catchError(res);
  }
}

// [POST] /api/v1/user/password/forgot
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const user = await User.findOne({
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

    // Save the OTP code to the database for 3 minutes
    const data = {
      email: email,
      otp: otp,
      expireAt: Date.now() + timeStamp * 60 * 1000,
    }
    const forgot = new Forgot(data);
    await forgot.save();

    // send the OTP code to email
    const subject = "OPT code to confirm fogotten password!";
    const html = `<p> Your OTP code is : <strong>${data.otp}</strong> , the code lasts for 3 minutes. Do not share with anyone </p>`;
    sendMailHelper(email, subject, html);

    res.json({
      code: 200,
      messasge: "OTP code has been sent to your email. Please check your email!"
    })
  } catch (error) {
    catchError(res);
  }
}

// [POST] /api/v1/user/password/otp
export const otpPassword = async (req: Request, res: Response) => {
  try {
    const otp: string = req.body.otp;
    const email: string = req.body.email;

    const forgot = await Forgot.findOne({
      email: email,
      otp: otp
    });

    if (!forgot) {
      res.json({
        code: 400,
        message: "OTP code is incorrect!"
      });
      return;
    };

    const user = await User.findOne({
      email: email
    });

    const token: string = user.token;

    res.cookie("token", token);

    res.json({
      code: 200,
      message: "OTP code is correct!",
      token: token
    });
  } catch (error) {
    catchError(res);
  }
}

// [POST] /api/v1/user/password/reset
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const token: string = req.cookies.token;
    const password: string = md5(req.body.password);

    console.log(token);

    await User.updateOne({
      token: token
    }, {
      password: password
    });

    res.json({
      code: 200,
      message: "Password reset successful!",
      // token: token
    });
  } catch (error) {
    catchError(res);
  }
}

// [GET] /api/v1/user/detail
export const detail = async (req: Request, res: Response) => {
  try {
    const token: string = req.cookies.token;
    const user = await User.findOne({
      token: token,
    }).select("-password");

    res.json({
      code: 200,
      message: "Get user information success!",
      user: user
    });
  } catch (error) {
    catchError(res);
  }
}


