import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    console.error(error);

    return res.status(500).json({
        error: "internal server error",
    });
};
