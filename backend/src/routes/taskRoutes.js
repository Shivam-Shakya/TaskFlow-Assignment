import express from "express";

import {
  createTask,
  updateTask,
  deleteTask,
  moveTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post(
  "/",
  createTask
);

router.put(
  "/:id",
  updateTask
);

router.delete(
  "/:id",
  deleteTask
);

router.patch(
  "/:id/move",
  moveTask
);

export default router;