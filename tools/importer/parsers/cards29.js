/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards29)'];
  const rows = [headerRow];

  // Find all .corp-news blocks (each is a card)
  const cardDivs = Array.from(element.querySelectorAll('.corp-news'));
  cardDivs.forEach(cardDiv => {
    // --- Image cell ---
    const imgEl = cardDiv.querySelector('.news-thumb img');
    const imageCell = imgEl ? imgEl : '';

    // --- Text cell ---
    const textCellContent = [];
    // Title (as heading, linked)
    const titleLink = cardDiv.querySelector('.news-copy-title a');
    if (titleLink) {
      const strong = document.createElement('strong');
      strong.appendChild(titleLink.cloneNode(true));
      textCellContent.push(strong);
    }
    // Description: Use alt text if available and not duplicate of title
    if (imgEl && imgEl.alt) {
      // Only add alt if not duplicate of title
      if (!titleLink || imgEl.alt.trim() !== titleLink.textContent.trim()) {
        textCellContent.push(document.createElement('br'));
        textCellContent.push(document.createTextNode(imgEl.alt));
      }
    }
    // Date
    const dateEl = cardDiv.querySelector('.news-copy-publish');
    if (dateEl) {
      textCellContent.push(document.createElement('br'));
      textCellContent.push(dateEl.cloneNode(true));
    }
    // Download link
    const downloadA = cardDiv.querySelector('.news-download a');
    if (downloadA) {
      textCellContent.push(document.createElement('br'));
      textCellContent.push(downloadA.cloneNode(true));
    }
    rows.push([imageCell, textCellContent]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
