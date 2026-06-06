import { AppError } from "../../errors/AppError.js";
import prismaClient from "../../prisma/index.js";

interface UpdateExpenseData {
    expenseId: string;
    user_id: string;
    description?: string;
    amount?: number;
    date?: string;
    category?: string;
}

export class UpdateExpenseService {
    async execute({
        expenseId,
        description,
        amount,
        date,
        category,
        user_id,
    }: UpdateExpenseData) {
        const expense = await prismaClient.expense.findFirst({
            where: {
                id: expenseId,
                user_id,
            },
            select: {
                id: true,
            },
        });
        if (!expense) {
            throw new AppError("Expense not found", 404);
        }

        const data: {
            description?: string;
            amount?: number;
            date?: Date;
            category?: string;
        } = {};

        if (description !== undefined) {
            data.description = description;
        }

        if (amount !== undefined) {
            data.amount = amount;
        }
        if (date !== undefined) {
            const parsedDate = new Date(date);

            if (Number.isNaN(parsedDate.getTime())) {
                throw new AppError("Date is invalid", 400);
            }

            data.date = parsedDate;
        }

        if (category !== undefined) {
            data.category = category;
        }

        const updatedExpense = await prismaClient.expense.update({
            where: {
                id: expenseId,
            },
            data,
            select: {
                id: true,
                description: true,
                amount: true,
                date: true,
                category: true,
            },
        });
        return updatedExpense;
    }
}
