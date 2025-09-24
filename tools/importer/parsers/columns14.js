/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as per block guidelines
  const headerRow = ['Columns block (columns14)'];

  // Get immediate children for layout
  const children = Array.from(element.querySelectorAll(':scope > *'));

  // Find textarea (text content) and image
  let textArea = null;
  let image = null;
  children.forEach((child) => {
    if (child.classList.contains('rlc-textarea')) {
      textArea = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    }
  });

  // Defensive: if missing, skip
  if (!textArea && !image) return;

  // Compose first content row: text left, image right (2 columns)
  const contentRow = [textArea, image];

  // Table structure: header + content
  const rows = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
