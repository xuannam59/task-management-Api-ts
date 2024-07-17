import { Request, Response, NextFunction } from "express"
import User from "../model/user.model";


export const requestAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization.split(" ")[1];

  const user = await User.findOne({
    token: token,
    deleted: false
  }).select("-password -token");
  if (!user) {
    res.json({
      code: 400,
      message: "Token is incorrect!"
    });
    return;
  }

  res.locals.user = user;
  next();
}
