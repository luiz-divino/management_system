import prismaClient from "../../prisma/index.js";
import { AppError } from "../../errors/AppError.js";

type TaskStatus = "PENDING" | "ACTIVE" | "DONE";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

interface UpdateTaskData {
    taskId: string;
    user_id: string;
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    deadLine?: string;
}

export class UpdateTaskService {
    async execute({
        taskId,
        user_id,
        title,
        description,
        status,
        priority,
        deadLine,
    }: UpdateTaskData) {
        const task = await prismaClient.task.findFirst({
            where: {
                id: taskId,
                user_id,
            },
            select: {
                id: true,
            },
        });

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        const data: {
            title?: string;
            description?: string | null;
            status?: TaskStatus;
            priority?: TaskPriority;
            deadLine?: Date | null;
        } = {};

        if (title !== undefined) {
            data.title = title;
        }

        if (description !== undefined) {
            data.description = description;
        }

        if (status !== undefined) {
            data.status = status;
        }

        if (priority !== undefined) {
            data.priority = priority;
        }

        if (deadLine !== undefined) {
            const parsedDeadline = new Date(deadLine);

            if (Number.isNaN(parsedDeadline.getTime())) {
                throw new AppError("Deadline is invalid", 400);
            }

            data.deadLine = parsedDeadline;
        }

        const updatedTask = await prismaClient.task.update({
            where: {
                id: taskId,
            },
            data,
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                deadLine: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return updatedTask;
    }
}
