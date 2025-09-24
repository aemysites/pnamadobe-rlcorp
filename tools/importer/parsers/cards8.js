/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text for each card
  function extractCardData(corpAsset) {
    // Image (first cell)
    let imgEl = corpAsset.querySelector('img');
    // Defensive: if no img, fallback to picture
    if (!imgEl) {
      const pic = corpAsset.querySelector('picture');
      if (pic) imgEl = pic;
    }
    // Text (second cell)
    const titleDiv = corpAsset.querySelector('.asset-title');
    let titleText = '';
    let descText = '';
    if (titleDiv) {
      // The title is the text node before the span
      const childNodes = Array.from(titleDiv.childNodes);
      for (const node of childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          titleText += node.textContent.trim();
        }
        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('asset-desc')) {
          descText = node.textContent.replace(/^\s+|\s+$/g, '');
        }
      }
    }
    // Compose text cell
    const textCell = document.createElement('div');
    if (titleText) {
      const h3 = document.createElement('h3');
      h3.textContent = titleText;
      textCell.appendChild(h3);
    }
    if (descText) {
      const p = document.createElement('p');
      p.textContent = descText;
      textCell.appendChild(p);
    }
    return [imgEl, textCell];
  }

  // Find all corp-asset elements (cards)
  const cards = Array.from(element.querySelectorAll('.corp-asset'));

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards8)']);
  // Card rows
  cards.forEach((card) => {
    const [img, textCell] = extractCardData(card);
    rows.push([img, textCell]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
