/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero9)'];

  // 2. Background image row
  let imageRow = [''];
  const picture = element.querySelector('picture');
  if (picture) {
    imageRow = [picture]; // reference, do not clone
  }

  // 3. Content row: title, subheading, CTA (NO breadcrumb)
  let contentEls = [];
  const copyGroup = element.querySelector('.rlc-copygroup');
  if (copyGroup) {
    // Title (h1)
    const h1 = copyGroup.querySelector('h1');
    if (h1) contentEls.push(h1);
    // If there are other subheadings or CTA, add them here (none in this example)
  }
  if (contentEls.length === 0) contentEls = [''];
  const contentRow = [contentEls];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
