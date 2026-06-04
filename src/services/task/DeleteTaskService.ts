import prismaClient from "../../prisma/index.js";

export class DeleteTaskService {
    async execute(taskId: string): Promise<void> {
        try {
            await prismaClient.task.delete({
                where: {
                    id: taskId,
                },
                select: {
                    id: true,
                    title: true,
                },
            });
        } catch (error) {
            throw new Error(
                `Failed to delete task with id ${taskId}: ${error}`,
            );
        }
        return;
    }
}
