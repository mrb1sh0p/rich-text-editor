export const handleTableKeyNavigation = (e) => {
  const cell = e.target.closest("td, th");
  if (!cell) return;

  const table = cell.closest("table");
  const rows = Array.from(table.rows);
  const rowIndex = cell.parentElement.rowIndex;
  const cellIndex = cell.cellIndex;

  switch (e.key) {
    case "ArrowUp":
      if (rowIndex > 0) rows[rowIndex - 1].cells[cellIndex].focus();
      break;
    case "ArrowDown":
      if (rowIndex < rows.length - 1)
        rows[rowIndex + 1].cells[cellIndex].focus();
      break;
    case "ArrowLeft":
      if (cellIndex > 0) cell.previousElementSibling.focus();
      break;
    case "ArrowRight":
      if (cellIndex < cell.parentElement.cells.length - 1)
        cell.nextElementSibling.focus();
      break;
    default:
      return;
  }
};
