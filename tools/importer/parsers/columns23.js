/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Header row as specified
  const headerRow = ['Columns block (columns23)'];

  // Get all immediate child sections (each is a column)
  const sections = Array.from(element.querySelectorAll(':scope > section'));

  // Defensive: If no sections found, fallback to all children
  const columns = sections.length ? sections : Array.from(element.children);

  // For each column, gather its content (title + dek)
  const contentRow = columns.map((col) => {
    // Gather all children of the section (should be h4 and p)
    return Array.from(col.childNodes).filter(
      (node) => node.nodeType === 1 // Only elements
    );
  });

  // Flatten each cell's array if only one element
  const normalizedRow = contentRow.map((arr) => arr.length === 1 ? arr[0] : arr);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    normalizedRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
