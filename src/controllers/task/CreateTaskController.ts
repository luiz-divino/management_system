import { Request, Response } from "express";
import { CreateTaskService } from "../../services/task/CreateTaskService.js";

export class CreateTaskController {
    async handle(req: Request, res: Response) {
        const { title, description, status, priority, deadLine } = req.body;
        const user_id = req.userId as string;

        const service = new CreateTaskService();
        const task = await service.execute({
            title,
            description,
            status,
            priority,
            deadLine,
            user_id,
        });

        return res.status(201).json(task);
    }
}

export const createTaskController = new CreateTaskController();
