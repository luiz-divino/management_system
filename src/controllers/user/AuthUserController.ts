import { authUserService } from "../../services/user/AuthUserService.js";
import { Request, Response } from "express";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const userLogin = await authUserService.execute({ email, password });
      res.json({
        userLogin,
      });
    } catch (error) {
      res.status(400).json(error);
    }
    res.status(500).json("internal server error");
  }
}

export const authUserController = new AuthUserController();
