/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns block (columns25)'];

  // Defensive: find the inner section containing the two columns
  const innerSection = element.querySelector('section');
  if (!innerSection) return;

  // Find left and right columns
  const leftCol = innerSection.querySelector('.rlc-col--left');
  const rightCol = innerSection.querySelector('.rlc-col--right');

  // Defensive: if either column is missing, fallback to empty cell
  let leftContent = '';
  let rightContent = '';

  if (leftCol) {
    // Use the whole left column content (textgroup)
    const leftTextGroup = leftCol.querySelector('.rlc-textgroup');
    leftContent = leftTextGroup ? leftTextGroup : '';
  }

  if (rightCol) {
    // Use the whole right column content (textgroup)
    const rightTextGroup = rightCol.querySelector('.rlc-textgroup');
    rightContent = rightTextGroup ? rightTextGroup : '';
  }

  // Build the table rows
  const rows = [
    headerRow,
    [leftContent, rightContent],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
