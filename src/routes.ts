import { Router } from "express";
import { validateUserSchema } from "./middlewares/validateUserSchema.js";
import { LoginUserSchema, createUserSchema } from "./schemas/userSchema.js";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { authUserController } from "./controllers/user/AuthUserController.js";

const router = Router();

router.get('/hello', (_, res)=>{
  res.send('Hello World!')
})

router.post(
  "/users",
  validateUserSchema(createUserSchema),
  new CreateUserController().handle,
);

router.post(
  "/session",
  validateUserSchema(LoginUserSchema),
  authUserController.handle,
);

export { router };
