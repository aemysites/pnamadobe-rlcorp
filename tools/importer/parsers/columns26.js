/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns26)'];

  // Get all direct child collaborator divs
  const collaborators = Array.from(element.querySelectorAll(':scope > div.rlc-collaborator'));
  if (!collaborators.length) return;

  // Use 3 columns per row
  const columnsPerRow = 3;
  const rows = [];
  for (let i = 0; i < collaborators.length; i += columnsPerRow) {
    const row = collaborators.slice(i, i + columnsPerRow);
    rows.push(row);
  }

  // Compose the table cells: header, then all rows
  const tableCells = [headerRow, ...rows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
