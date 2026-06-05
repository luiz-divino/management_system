import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
): void | Response<any, Record<string, any>> => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            error: "token not found",
        });
    }
    const [_, token] = authorization!.split(" ");
    try {
        const { sub } = jsonwebtoken.verify(
            token!,
            process.env.JWT_SECRET! as string,
        ) as IPayload;
        req.userId = sub;
        return next();
    } catch (error) {
        return res.status(401).json({
            error: "invalid token",
        });
    }
};
