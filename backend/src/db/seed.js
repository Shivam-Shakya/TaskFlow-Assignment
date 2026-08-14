import db from "./database.js";

const boardCount = db
  .prepare("SELECT COUNT(*) AS count FROM boards")
  .get();

if (boardCount.count === 0) {
  const insertBoard = db.prepare(`
    INSERT INTO boards (name)
    VALUES (?)
  `);

  const boardResult = insertBoard.run(
    "My Task Board"
  );

  const boardId = boardResult.lastInsertRowid;

  const insertColumn = db.prepare(`
    INSERT INTO columns (board_id, name)
    VALUES (?, ?)
  `);

  const todo = insertColumn.run(
    boardId,
    "To Do"
  );

  const progress = insertColumn.run(
    boardId,
    "In Progress"
  );

  const done = insertColumn.run(
    boardId,
    "Done"
  );

  const insertTask = db.prepare(`
    INSERT INTO tasks
    (column_id, title, description, priority)
    VALUES (?, ?, ?, ?)
  `);

  insertTask.run(
    todo.lastInsertRowid,
    "Learn React",
    "Practice React hooks and components",
    "High"
  );

  insertTask.run(
    todo.lastInsertRowid,
    "Create TaskFlow UI",
    "Build the task board interface",
    "Medium"
  );

  insertTask.run(
    progress.lastInsertRowid,
    "Build REST API",
    "Create Node.js and Express API",
    "High"
  );

  insertTask.run(
    done.lastInsertRowid,
    "Project Setup",
    "Initialize React and Node project",
    "Low"
  );

  console.log("Seed data inserted successfully.");
} else {
  console.log("Database already contains data.");
}

db.close();