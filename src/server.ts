import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const port = Number(process.env.PORT) || 3333;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
