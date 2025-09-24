/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero10)'];

  // Defensive: Find the section containing the hero content
  const section = element.querySelector('section.img-link');
  if (!section) return;

  // 2. Background image row
  let bgImg = null;
  const pictureHolder = section.querySelector('.corp-picture-holder picture');
  if (pictureHolder) {
    // Use the <img> inside <picture>
    const img = pictureHolder.querySelector('img');
    if (img) {
      bgImg = img;
    }
  }

  // 3. Content row (title, subheading, CTA)
  const copyCont = section.querySelector('.copy-cont');
  let contentCell = [];
  if (copyCont) {
    // Use all children of copyCont (h2, h3, etc)
    contentCell = Array.from(copyCont.childNodes).filter(n => {
      // Only include element nodes and text nodes with non-whitespace
      return (n.nodeType === 1) || (n.nodeType === 3 && n.textContent.trim());
    });
  }

  // Compose the table
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell.length ? contentCell : ''],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
