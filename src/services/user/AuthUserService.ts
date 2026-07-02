import prismaClient from "../../prisma/index.js";
import { compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { AppError } from "../../errors/AppError.js";

const { sign } = jsonwebtoken;

interface AuthUserServiceProps {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthUserServiceProps) {
        if (!process.env.JWT_SECRET) {
            throw new AppError("JWT secret is not configured", 500);
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError("Invalid email or password", 401);
        }
        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "30d",
            },
        );
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
        };
    }
}

export const authUserService = new AuthUserService();
