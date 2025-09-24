/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract unique cards from the carousel
  function getUniqueCards(articles) {
    const seenTitles = new Set();
    const unique = [];
    articles.forEach(article => {
      const titleEl = article.querySelector('.rlc-title');
      if (!titleEl) return;
      const titleText = titleEl.textContent.trim();
      if (!seenTitles.has(titleText)) {
        seenTitles.add(titleText);
        unique.push(article);
      }
    });
    return unique;
  }

  // Find the carousel wrapper (may be nested)
  const carousel = element.querySelector('.rlc-carousel_wrapper');
  if (!carousel) return;

  // Get all card articles
  const articles = Array.from(carousel.querySelectorAll('.rlc-slide'));
  const cards = getUniqueCards(articles);

  // Build table rows
  const rows = [];
  // Header row as specified
  const headerRow = ['Cards (cards33)'];
  rows.push(headerRow);

  // For each card, build a row: [image/icon, text content]
  cards.forEach(article => {
    const panel = article.querySelector('.rlc-panel_inner') || article;
    // Image/Icon
    const img = panel.querySelector('img');
    // Text content: include all content blocks in order
    const textCell = [];
    // Get all children except the image
    Array.from(panel.children).forEach(child => {
      if (child.tagName.toLowerCase() === 'img') return;
      // For links container, add all links inside
      if (child.classList.contains('rlc-links')) {
        Array.from(child.querySelectorAll('a')).forEach(a => {
          textCell.push(a.cloneNode(true));
        });
      } else {
        textCell.push(child.cloneNode(true));
      }
    });
    rows.push([
      img ? img.cloneNode(true) : '',
      textCell
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
