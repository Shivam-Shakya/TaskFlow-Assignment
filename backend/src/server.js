import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import "./db/database.js";

import boardRoutes from "./routes/boardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

const PORT =
  process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      message: "TaskFlow API is running",
    });
  }
);

app.use(
  "/api/boards",
  boardRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  (req, res) => {
    res.status(404).json({
      message: "Route not found",
    });
  }
);

app.use(
  (error, req, res, next) => {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
);

app.listen(
  PORT,
  () => {
    console.log(
      `TaskFlow server running on http://localhost:${PORT}`
    );
  }
);