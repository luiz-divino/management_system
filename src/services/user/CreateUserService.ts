import prismaClient from "../../prisma/index.js";
import bcrypt from "bcrypt";

interface UserData {
  name: string;
  email: string;
  password: string;
}
export class CreateUserService {
  async execute({ name, email, password }: UserData) {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
    const passwordHash = await bcrypt.hash(password, 8);
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    return user;
  }
}
