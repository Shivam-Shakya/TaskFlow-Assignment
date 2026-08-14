import express from "express";
import {
  getBoard,
} from "../controllers/taskController.js";

const router = express.Router();

router.get(
  "/:boardId",
  getBoard
);

export default router;