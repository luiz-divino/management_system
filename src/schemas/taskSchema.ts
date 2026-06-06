import { z } from "zod";

const taskStatusSchema = z.enum(["PENDING", "ACTIVE", "DONE"]);
const taskPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const createTaskSchema = z.object({
    body: z.object({
        title: z.string().trim().min(1, "Title is required"),
        description: z.string().optional(),
        status: taskStatusSchema.optional(),
        priority: taskPrioritySchema.optional(),
        deadLine: z.string().optional(),
    }),
});

export const updateTaskSchema = z.object({
    params: z.object({
        taskId: z.string().min(1, "Task ID is invalid"),
    }),
    body: z
        .object({
            title: z.string().trim().min(1, "Title is required").optional(),
            description: z.string().trim().optional(),
            status: taskStatusSchema.optional(),
            priority: taskPrioritySchema.optional(),
            deadLine: z
                .string()
                .trim()
                .min(1, "Deadline cannot be empty")
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

export const deleteTaskSchema = z.object({
    params: z.object({
        taskId: z.string().min(1, "Task ID is required"),
    }),
});

export const listTaskSchema = z.object({
    query: z.object({
        status: z.enum(["PENDING", "ACTIVE", "DONE"]).optional(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
        search: z.string().trim().min(1, "Search cannot be empty").optional(),
        page: z.coerce.number().int().positive().optional(),
        limit: z.coerce.number().int().positive().max(100).optional(),
    }),
});

export type CreateTaskSchema = typeof createTaskSchema;
export type UpdateTaskSchema = typeof updateTaskSchema;
export type DeleteTaskSchema = typeof deleteTaskSchema;
export type ListTaskSchema = typeof listTaskSchema;
