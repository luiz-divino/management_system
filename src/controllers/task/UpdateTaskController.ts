import { Request, Response } from "express";
import { UpdateTaskService } from "../../services/task/UpdateTaskService.js";

export class UpdateTaskController {
    async handle(req: Request, res: Response): Promise<Response> {
        const taskId = req.params.taskId as string;
        const { title, description, status, priority, deadLine } = req.body;
        const user_id = req.userId as string;

        const service = new UpdateTaskService();
        const task = await service.execute({
            taskId,
            user_id,
            title,
            description,
            status,
            priority,
            deadLine,
        });

        return res.status(200).json(task);
    }
}

export const updateTaskController = new UpdateTaskController();
