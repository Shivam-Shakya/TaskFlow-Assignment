# TaskFlow

A simple full-stack task management board built as a take-home assignment.

TaskFlow allows users to manage tasks across different columns such as
To Do, In Progress, and Done.

The application includes task creation, editing, deletion, moving tasks
between columns, priority filtering, backend validation, relational
database persistence, and backend tests.

---

## Live Demo

Frontend:
https://YOUR-FRONTEND-URL.vercel.app

Backend API:
https://YOUR-BACKEND-URL.onrender.com

> Replace the above URLs with the actual deployed URLs after deployment.

---

## GitHub Repository

https://github.com/Shivam-Shakya/TaskFlow-Assignment/tree/main

> Replace this with your actual GitHub repository URL.

---

# Features

## Core Features

- View a task board with multiple columns
- Create a new task
- Edit an existing task
- Delete a task
- Move tasks between columns
- Set task priority
- Filter tasks by priority
- Store tasks in a real relational database
- Data persists after page reload
- Backend validation for required task title
- User-friendly error handling
- Seed data for the database

## Task Fields

Each task contains:

- Title - Required
- Description - Optional
- Status / Column
- Priority - Low, Medium, or High
- Created Date

---

# Technology Stack

## Frontend

- React.js
- JavaScript
- CSS
- Vite
- Fetch API

## Backend

- Node.js
- Express.js
- JavaScript
- REST API

## Database

- SQLite
- better-sqlite3
- SQL schema
- Foreign keys
- Seed data

## Testing

- Jest
- Supertest

## Deployment

- Vercel - Frontend
- Render - Backend

---

# Project Structure

```text
taskflow-assignment/
│
├── backend/
│   │
│   ├── src/
│   │   │
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   │
│   │   ├── routes/
│   │   │   ├── boardRoutes.js
│   │   │   └── taskRoutes.js
│   │   │
│   │   ├── db/
│   │   │   ├── database.js
│   │   │   ├── schema.sql
│   │   │   └── seed.js
│   │   │
│   │   └── server.js
│   │
│   ├── tests/
│   │   └── task.test.js
│   │
│   ├── package.json
│   ├── .env
│   └── taskflow.db
│
├── FrontEnd/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Board.jsx
│   │   │   ├── Column.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── Filter.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
