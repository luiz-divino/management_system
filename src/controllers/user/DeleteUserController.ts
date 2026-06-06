import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService.js";
export class DeleteUserController {
    async handle(req: Request, res: Response) {
        const idUser = req.userId;
        const deleteUser = new DeleteUserService();
        const userDeleted = await deleteUser.execute(idUser as string);

        if (!userDeleted) {
            return res.status(404).json({
                error: "user not found",
            });
        }

        return res.sendStatus(204);
    }
}
