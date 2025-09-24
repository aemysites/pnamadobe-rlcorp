/* global WebImporter */
export default function parse(element, { document }) {
  // Find image column and content column
  const imgCol = element.querySelector('.img-cont');
  const contentCol = element.querySelector('.copy-card0');

  // --- Image cell ---
  let imgCell = null;
  if (imgCol) {
    const imgHolder = imgCol.querySelector('.corp-picture-holder');
    if (imgHolder) {
      const picture = imgHolder.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          imgCell = img;
        }
      }
    }
  }

  // --- Content cell ---
  let contentCell = null;
  if (contentCol) {
    const card = contentCol.querySelector('.copy-card');
    if (card) {
      const copyCont = card.querySelector('.copy-cont');
      const buttonDiv = card.querySelector('.corp-secondary-button');
      const cellContent = [];
      if (copyCont) cellContent.push(copyCont);
      if (buttonDiv) cellContent.push(buttonDiv);
      if (cellContent.length) {
        // Wrap multiple elements in a div to preserve semantic grouping
        const wrapper = document.createElement('div');
        cellContent.forEach(node => wrapper.appendChild(node));
        contentCell = wrapper;
      }
    }
  }

  // Compose table rows
  const headerRow = ['Columns block (columns2)'];
  const contentRow = [imgCell, contentCell].filter(Boolean);
  // If only one column found, fallback to single column
  const rows = [headerRow, contentRow.length > 1 ? contentRow : [imgCell || contentCell]];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
