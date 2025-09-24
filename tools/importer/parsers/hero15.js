/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Hero (hero15)'];

  // 2. Background image row (should always be present, even if empty)
  const bgImageRow = [''];

  // 3. Content row: All content from .rlc-textarea
  const textarea = element.querySelector('.rlc-textarea');
  let contentRowCell = '';
  if (textarea) {
    // Use the whole .rlc-textarea block as the cell content
    contentRowCell = textarea;
  }
  const contentRow = [contentRowCell];

  // 4. Assemble table: always 3 rows (header, bg image, content)
  const rows = [headerRow, bgImageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace original element
  element.replaceWith(table);
}
