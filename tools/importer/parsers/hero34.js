/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero34)'];

  // 2. Background image row
  let backgroundImgCell = '';
  const pictureHolder = element.querySelector('.corp-picture-holder');
  if (pictureHolder) {
    const img = pictureHolder.querySelector('img');
    if (img) backgroundImgCell = img;
  }

  // 3. Content row: Title, subheading, CTA
  // Find the .corp-loop-cont (contains video + CTA button)
  let contentCell = document.createElement('div');
  contentCell.style.display = 'flex';
  contentCell.style.flexDirection = 'column';

  const loopCont = element.querySelector('.corp-loop-cont');
  if (loopCont) {
    // Only add the CTA button once
    const ctaButton = loopCont.querySelector('.corp-secondary-button a');
    if (ctaButton) {
      contentCell.appendChild(ctaButton.cloneNode(true));
    }
  }

  // Compose the table
  const rows = [
    headerRow,
    [backgroundImgCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
