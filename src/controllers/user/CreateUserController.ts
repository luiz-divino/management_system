import { CreateUserService } from "../../services/user/CreateUserService.js";
import { Request, Response } from "express";
export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const service = new CreateUserService();
    const user = await service.execute({
      name: name,
      email: email,
      password: password,
    });
    return res.status(201).json(user);
  }
}
