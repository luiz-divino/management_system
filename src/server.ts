import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);
app.use(router);
app.use(errorHandler);

const port = Number(process.env.PORT) || 3333;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
