import { Request, Response, NextFunction } from "express";
import md5 from "md5";
import User from "../model/user.model";

const emailFormat = (email: string) => {
  const regexEmail: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return email.toLowerCase().match(regexEmail);
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  const user = await User.findOne({
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
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;

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

  if (md5(password) !== user.password) {
    res.json({
      code: 400,
      message: "Password is incorrect!"
    });
    return;
  }

  next();
}