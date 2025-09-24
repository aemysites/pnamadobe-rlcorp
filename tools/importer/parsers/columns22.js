/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child articles representing columns
  const articles = Array.from(element.querySelectorAll(':scope .rlc-goal_col'));

  // Defensive fallback: If no articles found, try inner section
  let columns = articles;
  if (columns.length === 0) {
    const innerSection = element.querySelector(':scope section');
    if (innerSection) {
      columns = Array.from(innerSection.querySelectorAll(':scope .rlc-goal_col'));
    }
  }

  // For each column, extract its main content (the .rlc-inner div)
  const columnCells = columns.map(col => {
    const inner = col.querySelector(':scope .rlc-inner');
    // If .rlc-inner not found, fallback to the article itself
    return inner || col;
  });

  // Table structure: header row, then one row with all columns
  const headerRow = ['Columns block (columns22)'];
  const contentRow = columnCells;
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
