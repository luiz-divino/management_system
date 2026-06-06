import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());

const allowedOrigins = new Set(
    [
        process.env.FRONTEND_URL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ].filter((origin): origin is string => Boolean(origin)),
);

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.has(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error("Not allowed by CORS"));
        },
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
