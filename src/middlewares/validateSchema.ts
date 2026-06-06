import { ZodError, ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateSchema =
    (schema: ZodType) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    details: error.issues.map((issue) => ({
                        field: issue.path.join(".") || "body",
                        message: issue.message,
                    })),
                });
            }

            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
    };
