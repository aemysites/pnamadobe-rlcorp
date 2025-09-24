/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as the header row
  const headerRow = ['Columns block (columns35)'];

  // Get all immediate child <section> elements (each is a column)
  const sections = Array.from(element.querySelectorAll(':scope > section'));

  // Defensive: If no sections, fallback to div children (shouldn't happen here)
  let columns;
  if (sections.length > 0) {
    columns = sections.map((section) => {
      // For each section, collect all its children (e.g., h4, p)
      return Array.from(section.children);
    });
  } else {
    // fallback: treat each child div as a column
    columns = Array.from(element.children).map((child) => Array.from(child.children));
  }

  // The columns array is an array of arrays of elements. Flatten each column if only one element.
  const secondRow = columns.map((col) => (col.length === 1 ? col[0] : col));

  // Compose the table rows
  const tableRows = [headerRow, secondRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
