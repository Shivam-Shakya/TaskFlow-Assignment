import db from "../db/database.js";

export const getBoard = (req, res) => {
  try {
    const boardId = Number(req.params.boardId);

    const board = db
      .prepare(`
        SELECT id, name
        FROM boards
        WHERE id = ?
      `)
      .get(boardId);

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    const columns = db
      .prepare(`
        SELECT id, board_id, name
        FROM columns
        WHERE board_id = ?
        ORDER BY id
      `)
      .all(boardId);

    const tasks = db
      .prepare(`
        SELECT
          id,
          column_id,
          title,
          description,
          priority,
          created_at
        FROM tasks
        WHERE column_id IN (
          SELECT id
          FROM columns
          WHERE board_id = ?
        )
        ORDER BY created_at DESC
      `)
      .all(boardId);

    const result = {
      ...board,
      columns: columns.map((column) => ({
        ...column,
        tasks: tasks.filter(
          (task) =>
            task.column_id === column.id
        ),
      })),
    };

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch board",
    });
  }
};


export const createTask = (req, res) => {
  try {
    const {
      title,
      description = "",
      priority = "Low",
      column_id,
    } = req.body;

    // Backend validation
    if (
      !title ||
      typeof title !== "string" ||
      !title.trim()
    ) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    if (
      !["Low", "Medium", "High"].includes(
        priority
      )
    ) {
      return res.status(400).json({
        message: "Invalid priority",
      });
    }

    if (!column_id) {
      return res.status(400).json({
        message: "Column is required",
      });
    }

    const column = db
      .prepare(`
        SELECT id
        FROM columns
        WHERE id = ?
      `)
      .get(column_id);

    if (!column) {
      return res.status(404).json({
        message: "Column not found",
      });
    }

    const result = db
      .prepare(`
        INSERT INTO tasks
        (column_id, title, description, priority)
        VALUES (?, ?, ?, ?)
      `)
      .run(
        column_id,
        title.trim(),
        description?.trim() || "",
        priority
      );

    const task = db
      .prepare(`
        SELECT *
        FROM tasks
        WHERE id = ?
      `)
      .get(result.lastInsertRowid);

    res.status(201).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
};


export const updateTask = (req, res) => {
  try {
    const taskId = Number(req.params.id);

    const {
      title,
      description = "",
      priority,
    } = req.body;

    if (
      !title ||
      typeof title !== "string" ||
      !title.trim()
    ) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    if (
      !["Low", "Medium", "High"].includes(
        priority
      )
    ) {
      return res.status(400).json({
        message: "Invalid priority",
      });
    }

    const existingTask = db
      .prepare(`
        SELECT *
        FROM tasks
        WHERE id = ?
      `)
      .get(taskId);

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    db.prepare(`
      UPDATE tasks
      SET
        title = ?,
        description = ?,
        priority = ?
      WHERE id = ?
    `).run(
      title.trim(),
      description?.trim() || "",
      priority,
      taskId
    );

    const updatedTask = db
      .prepare(`
        SELECT *
        FROM tasks
        WHERE id = ?
      `)
      .get(taskId);

    res.json(updatedTask);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
};


export const deleteTask = (req, res) => {
  try {
    const taskId = Number(req.params.id);

    const task = db
      .prepare(`
        SELECT id
        FROM tasks
        WHERE id = ?
      `)
      .get(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    db.prepare(`
      DELETE FROM tasks
      WHERE id = ?
    `).run(taskId);

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};


export const moveTask = (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const { column_id } = req.body;

    if (!column_id) {
      return res.status(400).json({
        message: "Column is required",
      });
    }

    const task = db
      .prepare(`
        SELECT id
        FROM tasks
        WHERE id = ?
      `)
      .get(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const column = db
      .prepare(`
        SELECT id
        FROM columns
        WHERE id = ?
      `)
      .get(column_id);

    if (!column) {
      return res.status(404).json({
        message: "Column not found",
      });
    }

    db.prepare(`
      UPDATE tasks
      SET column_id = ?
      WHERE id = ?
    `).run(
      column_id,
      taskId
    );

    const updatedTask = db
      .prepare(`
        SELECT *
        FROM tasks
        WHERE id = ?
      `)
      .get(taskId);

    res.json(updatedTask);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to move task",
    });
  }
};