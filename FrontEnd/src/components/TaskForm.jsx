import { useEffect, useState } from "react";

function TaskForm({
  task,
  columns = [],
  onSubmit,
  onCancel,
}) {
  const isEditing = Boolean(task);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [columnId, setColumnId] = useState("");

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (task) {
      // Edit mode
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "Low");
      setColumnId(
        task.column_id
          ? String(task.column_id)
          : ""
      );
    } else {
      // Create mode
      setTitle("");
      setDescription("");
      setPriority("Low");

      if (columns.length > 0) {
        setColumnId(String(columns[0].id));
      } else {
        setColumnId("");
      }
    }

    setFormError("");
  }, [task, columns]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError("");

    // Title validation
    if (!title.trim()) {
      setFormError("Task title is required.");
      return;
    }

    // Column validation
    if (!columnId) {
      setFormError("Please select a column.");
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      column_id: Number(columnId),
    };

    onSubmit(taskData);
  };

  return (
    <div className="form-overlay">
      <div className="task-form-container">

        {/* Header */}
        <div className="form-header">
          <h2>
            {isEditing
              ? "Edit Task"
              : "Create Task"}
          </h2>

          <button
            type="button"
            className="close-btn"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        {/* Form Error */}
        {formError && (
          <div className="error-message">
            <span>{formError}</span>

            <button
              type="button"
              onClick={() => setFormError("")}
            >
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">
              Title *
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Enter task description"
              rows="4"
            />
          </div>

          {/* Priority */}
          <div className="form-group">
            <label htmlFor="priority">
              Priority
            </label>

            <select
              id="priority"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
            >
              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>
            </select>
          </div>

          {/* Column */}
          <div className="form-group">
            <label htmlFor="column">
              Column *
            </label>

            <select
              id="column"
              value={columnId}
              onChange={(e) =>
                setColumnId(e.target.value)
              }
              required
            >
              <option value="">
                Select column
              </option>

              {columns.map((column) => (
                <option
                  key={column.id}
                  value={column.id}
                >
                  {column.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="form-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
            >
              {isEditing
                ? "Update Task"
                : "Create Task"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;