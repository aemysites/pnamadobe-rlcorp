/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate img children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > img'));

  // Header row: block name
  const headerRow = ['Columns block (columns17)'];

  // Second row: each image is a column
  const columnsRow = columns;

  // Build the table
  const cells = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
