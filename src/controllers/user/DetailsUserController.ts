import { datailsUser } from "../../services/user/DetailsUserService.js";
import { Request, Response } from "express";
export class DetailsUserController {
    async handle(req: Request, res: Response) {
        const user_id = req.userId;
        const user = await datailsUser.execute(user_id as string);
        return res.json(user);
    }
}
