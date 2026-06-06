import { z } from "zod";
export const createExpenseSchema = z.object({
    body: z.object({
        description: z.string().min(1, "Description is required"),
        amount: z.coerce.number().positive("Amount must be a positive number"),
        date: z.string().optional(),
        category: z.string().min(1, "Category is required"),
    }),
});

export const listExpenseSchema = z.object({
    query: z.object({
        category: z
            .string()
            .trim()
            .min(1, "Category cannot be empty")
            .optional(),
        search: z.string().trim().min(1, "Search cannot be empty").optional(),
        page: z.coerce.number().int().positive().optional(),
        limit: z.coerce.number().int().positive().max(100).optional(),
    }),
});

export const updateExpenseSchema = z.object({
    params: z.object({
        expenseId: z.string().min(1, "Expense ID is invalid"),
    }),
    body: z
        .object({
            description: z
                .string()
                .trim()
                .min(1, "Description is required")
                .optional(),
            amount: z.coerce
                .number()
                .positive("Amount must be a positive number")
                .optional(),
            date: z.string().trim().min(1, "Date cannot be empty").optional(),
            category: z
                .string()
                .trim()
                .min(1, "Category is required")
                .optional(),
        })
        .strict()
        .refine(
            (data) => Object.values(data).some((value) => value !== undefined),
            {
                message: "At least one field must be provided",
            },
        ),
});

export const deleteExpenseSchema = z.object({
    params: z.object({
        expenseId: z.string().min(1, "Expense ID is required"),
    }),
});

export type createExpenseSchemaType = typeof createExpenseSchema;
export type listExpenseSchemaType = typeof listExpenseSchema;
export type updateExpenseSchemaType = typeof updateExpenseSchema;
export type deleteExpenseSchemaType = typeof deleteExpenseSchema;
