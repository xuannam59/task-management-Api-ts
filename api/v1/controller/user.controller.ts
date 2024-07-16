import { Response, Request } from "express";
import md5 from "md5";

import User from "../model/user.model";

import * as generateHelper from "../helper/generate.helper";

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
    res.json({
      code: 400,
      message: "Error!"
    });
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
    res.json({
      code: 400,
      message: "Error!"
    });
  }
} 