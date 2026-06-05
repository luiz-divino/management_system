import { Router } from "express";
import { validateSchema } from "./middlewares/validateSchema.js";
import { LoginUserSchema, createUserSchema } from "./schemas/userSchema.js";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { authUserController } from "./controllers/user/AuthUserController.js";
import {
    createTaskSchema,
    deleteTaskSchema,
    listTaskSchema,
} from "./schemas/taskSchema.js";
import { createTaskController } from "./controllers/task/CreateTaskController.js";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";
import { DeleteTaskController } from "./controllers/task/DeleteTaskController.js";
import { DeleteUserController } from "./controllers/user/DeleteUserController.js";
import { asyncHandler } from "./util/asyncHandler.js";
import { ListTaskController } from "./controllers/task/ListTaskController.js";
import {
    createExpenseSchema,
    listExpenseSchema,
} from "./schemas/expenseSchema.js";
import { CreateExpenseController } from "./controllers/expense/CreateExpenseController.js";
import { ListExpenseController } from "./controllers/expense/ListExpenseController.js";

const router = Router();
const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const deleteTaskController = new DeleteTaskController();
const listTaskController = new ListTaskController();
const createExpenseController = new CreateExpenseController();
const listExpenseController = new ListExpenseController();

router.get("/hello", (_, res) => {
    res.send("Hello World!");
});

// criar um usuario
router.post(
    "/users",
    validateSchema(createUserSchema),
    asyncHandler(createUserController.handle.bind(createUserController)),
);

//fazer login
router.post(
    "/session",
    validateSchema(LoginUserSchema),
    asyncHandler(authUserController.handle.bind(authUserController)),
);

// delete meu usuario
router.delete(
    "/me",
    isAuthenticated,
    asyncHandler(deleteUserController.handle.bind(deleteUserController)),
);

// criar uma tarefa
router.post(
    "/tasks",
    validateSchema(createTaskSchema),
    isAuthenticated,
    asyncHandler(createTaskController.handle.bind(createTaskController)),
);

// listar tarefas
router.get(
    "/tasks",
    validateSchema(listTaskSchema),
    isAuthenticated,
    asyncHandler(listTaskController.handle.bind(listTaskController)),
);

// deletar uma tarefa
router.delete(
    "/tasks/:taskId",
    validateSchema(deleteTaskSchema),
    isAuthenticated,
    asyncHandler(deleteTaskController.handle.bind(deleteTaskController)),
);

router.post(
    "/expenses",
    validateSchema(createExpenseSchema),
    isAuthenticated,
    asyncHandler(createExpenseController.handle.bind(createExpenseController)),
);

router.get(
    "/expenses",
    validateSchema(listExpenseSchema),
    isAuthenticated,
    asyncHandler(listExpenseController.handle.bind(listExpenseController)),
);

export { router };
