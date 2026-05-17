import prismaClient from "../../prisma/index.js";

class DetailsUserService {
  async execute(id_user: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: id_user,
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
