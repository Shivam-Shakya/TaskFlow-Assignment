import TaskCard from "./TaskCard";

function Column({
  column,
  columns,
  priority,
  onEdit,
  onDelete,
  onMove,
}) {
  const filteredTasks =
    priority === "All"
      ? column.tasks
      : column.tasks.filter(
          (task) => task.priority === priority
        );

  return (
    <section className="column">
      <div className="column-header">
        <h2>{column.name}</h2>

        <span className="task-count">
          {filteredTasks.length}
        </span>
      </div>

      <div className="tasks">
        {filteredTasks.length === 0 ? (
          <div className="empty-column">
            No tasks
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columns={columns}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Column;