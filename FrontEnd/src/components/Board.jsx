import Column from "./Column";

function Board({
  board,
  priority,
  onEdit,
  onDelete,
  onMove,
}) {
  return (
    <main className="board">
      {board.columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          priority={priority}
          columns={board.columns}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </main>
  );
}

export default Board;