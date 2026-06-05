import prismaClient from "../../prisma/index.js";

interface ListExpenseFilters {
    user_id: string;
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
}

export class ListExpenseService {
    async execute({
        user_id,
        category,
        search,
        page = 1,
        limit = 10,
    }: ListExpenseFilters) {
        const skip = (page - 1) * limit;

        const tasks = await prismaClient.expense.findMany({
            where: {
                user_id,
                category,
                ...(search
                    ? {
                          description: {
                              contains: search,
                              mode: "insensitive",
                          },
                      }
                    : {}),
            },
            orderBy: {
                date: "desc",
            },
            skip,
            take: limit,
            select: {
                id: true,
                description: true,
                amount: true,
                date: true,
                category: true,
            },
        });

        return tasks;
    }
}
