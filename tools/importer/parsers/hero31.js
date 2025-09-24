/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children by class
  const getChildByClass = (parent, className) => {
    return Array.from(parent.children).find(el => el.classList.contains(className));
  };

  // 1. Header row
  const headerRow = ['Hero (hero31)'];

  // 2. Background image row
  let imageCell = '';
  const pictureHolder = getChildByClass(element, 'corp-picture-holder');
  if (pictureHolder) {
    // Find the <img> inside <picture>
    const picture = pictureHolder.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        imageCell = img;
      }
    }
  }

  // 3. Content row (title, subheading, CTA)
  let contentCell = '';
  const copyCont = getChildByClass(element, 'copy-cont');
  if (copyCont) {
    // Use all content inside copy-cont
    contentCell = Array.from(copyCont.childNodes).filter(node => {
      // Only keep elements and non-empty text nodes
      return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
    });
    // If only one element, don't wrap in array
    if (contentCell.length === 1) contentCell = contentCell[0];
  }

  // Build the table
  const rows = [
    headerRow,
    [imageCell],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
