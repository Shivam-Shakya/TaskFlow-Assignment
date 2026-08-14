function TaskCard({
  task,
  columns,
  onEdit,
  onDelete,
  onMove,
}) {
  return (
    <article className="task-card">
      <div className="task-card-top">
        <h3>{task.title}</h3>

        <span
          className={`priority priority-${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="task-description">
          {task.description}
        </p>
      )}

      <div className="task-date">
        Created:{" "}
        {new Date(task.created_at).toLocaleDateString()}
      </div>

      <div className="task-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>

      <div className="move-task">
        <label htmlFor={`move-${task.id}`}>
          Move to:
        </label>

        <select
          id={`move-${task.id}`}
          value={task.column_id}
          onChange={(e) =>
            onMove(task.id, Number(e.target.value))
          }
        >
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
    </article>
  );
}

export default TaskCard;