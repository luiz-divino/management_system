import { Router } from "express";
import { validateSchema } from "./middlewares/validateSchema.js";
import { LoginUserSchema, createUserSchema } from "./schemas/userSchema.js";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { authUserController } from "./controllers/user/AuthUserController.js";
import { createTaskSchema, deleteTaskSchema } from "./schemas/taskSchema.js";
import { createTaskController } from "./controllers/task/CreateTaskController.js";
import { isAutenticated } from "./middlewares/isAutenticated.js";
import { DeleteTaskController } from "./controllers/task/DeleteTaskController.js";

const router = Router();

router.get("/hello", (_, res) => {
    res.send("Hello World!");
});

router.post(
    "/users",
    validateSchema(createUserSchema),
    new CreateUserController().handle,
);

router.post(
    "/session",
    validateSchema(LoginUserSchema),
    authUserController.handle,
);

router.post(
    "/tasks",
    validateSchema(createTaskSchema),
    isAutenticated,
    createTaskController.handle,
);

router.delete(
    "/tasks/:taskId",
    validateSchema(deleteTaskSchema),
    isAutenticated,
    new DeleteTaskController().handle,
);

export { router };
