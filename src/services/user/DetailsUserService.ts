import prismaClient from "../../prisma/index.js";

class DetailsUserService {
    async execute(user_id: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
        });
        if (!user) {
            throw new Error("user not found");
        }
        return user;
    }
}
export const datailsUser = new DetailsUserService();
