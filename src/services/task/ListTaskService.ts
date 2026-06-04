import prismaClient from "../../prisma/index.js";

type TaskStatus = "PENDING" | "ACTIVE" | "DONE";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

interface ListTaskFilters {
    user_id: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string;
    page?: number;
    limit?: number;
}

export class ListTaskService {
    async execute({
        user_id,
        status,
        priority,
        search,
        page = 1,
        limit = 10,
    }: ListTaskFilters) {
        const skip = (page - 1) * limit;

        const tasks = await prismaClient.task.findMany({
            where: {
                user_id,
                status,
                priority,
                ...(search
                    ? {
                          OR: [
                              {
                                  title: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                              {
                                  description: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                          ],
                      }
                    : {}),
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
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

        return tasks;
    }
}
