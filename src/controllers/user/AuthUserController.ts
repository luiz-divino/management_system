import { authUserService } from "../../services/user/AuthUserService.js";
import { Request, Response } from "express";

class AuthUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const userLogin = await authUserService.execute({
                email,
                password,
            });
            return res.json({
                userLogin,
            });
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}

export const authUserController = new AuthUserController();
