/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children by selector
  const getDirectChild = (parent, selector) => {
    return Array.from(parent.children).find(child => child.matches(selector));
  };

  // 1. Header row
  const headerRow = ['Columns block (columns36)'];

  // 2. Analyze layout: screenshot shows two columns side by side
  // Left: contact info (sidebar)
  // Right: contact form + legal terms

  // Defensive: find sidebar and form blocks
  const sidebar = getDirectChild(element, '.contact-sidebar');
  const formBlock = getDirectChild(element, '.contact-form');

  // If not found, fallback to first/second child
  const leftCol = sidebar || element.children[0];
  const rightCol = formBlock || element.children[1];

  // 3. Compose columns
  // Left column: all contact info sections
  // Right column: form, error message, and legal terms

  // Defensive: collect all content for each column
  const leftContent = [];
  if (leftCol) {
    leftContent.push(leftCol);
  }

  const rightContent = [];
  if (rightCol) {
    // Form
    const form = rightCol.querySelector('form');
    if (form) rightContent.push(form);
    // Error message (if present)
    const errorMsg = rightCol.querySelector('.error-message');
    if (errorMsg && errorMsg.textContent.trim()) rightContent.push(errorMsg);
    // Legal terms
    const legalTerms = rightCol.querySelector('.contact-legal-terms');
    if (legalTerms) rightContent.push(legalTerms);
  }

  // 4. Table rows: header, then columns
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  // 5. Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
