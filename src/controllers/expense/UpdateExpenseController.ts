import { Request, Response } from "express";
import { UpdateExpenseService } from "../../services/expense/UpdateExpenseService.js";
export class UpdateExpenseController {
    async handle(req: Request, res: Response) {
        const expenseId = req.params.expenseId as string;
        const user_id = req.userId as string;
        const { description, amount, date, category } = req.body;
        const UpdateExpense = new UpdateExpenseService();
        try {
            let parsedAmount: number;
            if (typeof amount === "string") {
                parsedAmount = Number(String(amount).replace(",", "."));
            } else {
                parsedAmount = amount as number;
            }

            if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
                return res.status(400).json({ error: "Invalid amount" });
            }

            const expense = await UpdateExpense.execute({
                expenseId,
                description,
                amount: parsedAmount,
                date,
                category,
                user_id,
            });

            return res.status(200).json(expense);
        } catch (error) {
            return res.status(500).json({ error: "Failed to update expense" });
        }
    }
}

export const updateExpenseController = new UpdateExpenseController();
