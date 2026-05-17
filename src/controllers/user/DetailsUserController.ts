import { datailsUser } from "../../services/user/DetailsUserService.js";
import { Request, Response } from "express";
export class DetailsUserController {
  async handle(req: Request, res: Response) {
    const { id_user } = req.body;
    const user = await datailsUser.execute(id_user as string);
    return res.json(user);
  }
}
