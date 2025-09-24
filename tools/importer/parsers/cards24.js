/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image (img) from a .corp-asset
  function getCardImage(asset) {
    const img = asset.querySelector('picture img');
    return img ? img : '';
  }

  // Helper to extract the title and description from .asset-title
  function getCardText(asset) {
    const titleDiv = asset.querySelector('.asset-title');
    if (!titleDiv) return '';
    // The title is the text node before the span
    let title = '';
    let desc = '';
    for (const node of titleDiv.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        title += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('asset-desc')) {
        desc = node.textContent.trim();
      }
    }
    // Title as strong
    const strong = document.createElement('strong');
    strong.textContent = title.trim();
    // Description as a paragraph (if present)
    let descElem = null;
    if (desc) {
      descElem = document.createElement('p');
      descElem.textContent = desc.replace(/^[\s\u00a0]+/, '');
    }
    return descElem ? [strong, descElem] : [strong];
  }

  // Find all .corp-asset elements in the block
  const assets = element.querySelectorAll('.corp-asset');
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards24)'];
  rows.push(headerRow);

  assets.forEach((asset) => {
    // First cell: image
    const img = getCardImage(asset);
    // Second cell: title + description (title as strong, description as p)
    const textContent = getCardText(asset);
    rows.push([
      img,
      textContent
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
