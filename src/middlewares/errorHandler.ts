import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export const errorHandler = (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    const isProd = process.env.NODE_ENV === "production";

    // Always log the error on the server for diagnostics
    console.error(error);

    if (!isProd) {
        // In non-production show helpful debug info
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                error: error.message,
                stack: (error as Error).stack,
            });
        }

        return res.status(500).json({
            error:
                error instanceof Error
                    ? error.message
                    : "internal server error",
            stack: error instanceof Error ? error.stack : undefined,
        });
    }

    // Production: do not expose stack or internal details to clients
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            error: error.message,
        });
    }

    return res.status(500).json({
        error: "internal server error",
    });
};
