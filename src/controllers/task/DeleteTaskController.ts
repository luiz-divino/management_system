import { Request, Response } from "express";
import { DeleteTaskService } from "../../services/task/DeleteTaskService.js";

export class DeleteTaskController {
    async handle(req: Request, res: Response): Promise<void> {
        const { taskId } = req.params;
        const deleteTask = new DeleteTaskService();
        const task = deleteTask.execute(taskId as string);
        res.status(204).json(task);
    }
}
