import { Request, Response } from "express";
import { ListExpenseService } from "../../services/expense/ListExpenseService.js";

export class ListExpenseController {
    async handle(req: Request, res: Response) {
        const user_id = req.userId as string;
        const { category, search, page, limit } = req.query;

        const service = new ListExpenseService();
        const expenses = await service.execute({
            user_id,
            category: category as string | undefined,
            search: search as string | undefined,
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        });

        return res.json(expenses);
    }
}

export const listExpenseController = new ListExpenseController();
