function Filter({
  priority,
  setPriority,
}) {
  return (
    <div className="filter-container">
      <label htmlFor="priority-filter">
        Filter by priority:
      </label>

      <select
        id="priority-filter"
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
      >
        <option value="All">All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}

export default Filter;