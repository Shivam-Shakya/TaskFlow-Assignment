import { useEffect, useState } from "react";

import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import Filter from "./components/Filter";

import {
  getBoard,
  createTask,
  updateTask,
  deleteTask,
  moveTask,
} from "./services/api";

import "./App.css";

function App() {
  // Board data
  const [board, setBoard] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // Priority filter
  const [priority, setPriority] =
    useState("All");

  // Create form
  const [showForm, setShowForm] =
    useState(false);

  // Edit task
  const [editingTask, setEditingTask] =
    useState(null);

  // ==========================================
  // LOAD BOARD
  // ==========================================

  const loadBoard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getBoard();

      setBoard(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load board."
      );
    } finally {
      setLoading(false);
    }
  };

  // Load board when component starts
  useEffect(() => {
    loadBoard();
  }, []);

  // ==========================================
  // CREATE TASK
  // ==========================================

  const handleCreateTask = async (
    taskData
  ) => {
    try {
      setError("");

      await createTask(taskData);

      // Close form
      setShowForm(false);

      // Reload latest data
      await loadBoard();
    } catch (err) {
      setError(
        err.message ||
          "Failed to create task."
      );
    }
  };

  // ==========================================
  // UPDATE TASK
  // ==========================================

  const handleUpdateTask = async (
    taskData
  ) => {
    try {
      setError("");

      await updateTask(
        editingTask.id,
        taskData
      );

      // Close edit form
      setEditingTask(null);

      // Reload latest data
      await loadBoard();
    } catch (err) {
      setError(
        err.message ||
          "Failed to update task."
      );
    }
  };

  // ==========================================
  // DELETE TASK
  // ==========================================

  const handleDeleteTask = async (
    taskId
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      await deleteTask(taskId);

      // Reload board
      await loadBoard();
    } catch (err) {
      setError(
        err.message ||
          "Failed to delete task."
      );
    }
  };

  // ==========================================
  // MOVE TASK
  // ==========================================

  const handleMoveTask = async (
    taskId,
    columnId
  ) => {
    try {
      setError("");

      await moveTask(
        taskId,
        columnId
      );

      // Reload board
      await loadBoard();
    } catch (err) {
      setError(
        err.message ||
          "Failed to move task."
      );
    }
  };

  // ==========================================
  // OPEN CREATE FORM
  // ==========================================

  const openCreateForm = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  const openEditForm = (task) => {
    setShowForm(false);
    setEditingTask(task);
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          Loading TaskFlow...
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="app">

      {/* =====================================
          HEADER
      ====================================== */}

      <header className="header">

        <div>
          <h1>TaskFlow</h1>

          <p>
            Simple task management board
          </p>
        </div>

        <button
          className="add-task-btn"
          onClick={openCreateForm}
        >
          + Add Task
        </button>

      </header>


      {/* =====================================
          BACKEND ERROR
      ====================================== */}

      {error && (
        <div className="error-message">

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
          >
            ×
          </button>

        </div>
      )}


      {/* =====================================
          FILTER
      ====================================== */}

      <Filter
        priority={priority}
        setPriority={setPriority}
      />


      {/* =====================================
          CREATE TASK FORM
      ====================================== */}

      {showForm && board && (
        <TaskForm
          columns={
            board.columns || []
          }
          onSubmit={
            handleCreateTask
          }
          onCancel={
            closeForm
          }
        />
      )}


      {/* =====================================
          EDIT TASK FORM
      ====================================== */}

      {editingTask && board && (
        <TaskForm
          task={editingTask}
          columns={
            board.columns || []
          }
          onSubmit={
            handleUpdateTask
          }
          onCancel={
            closeForm
          }
        />
      )}


      {/* =====================================
          BOARD
      ====================================== */}

      {board && (
        <Board
          board={board}
          priority={priority}
          onEdit={openEditForm}
          onDelete={
            handleDeleteTask
          }
          onMove={
            handleMoveTask
          }
        />
      )}

    </div>
  );
}

export default App;