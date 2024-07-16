import { Response, Request } from "express";

export const resigter = async (req: Request, res: Response) => {
  try {
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