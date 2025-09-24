/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel wrapper
  const carouselWrapper = element.querySelector('.rlc-carousel_wrapper');
  if (!carouselWrapper) return;

  // Get all unique cards by data-swiper-slide-index
  const seen = new Set();
  const cards = [];
  const articles = carouselWrapper.querySelectorAll('.swiper-wrapper > article.rlc-slide');
  articles.forEach((article) => {
    const idx = article.getAttribute('data-swiper-slide-index');
    if (!seen.has(idx)) {
      seen.add(idx);
      cards.push(article);
    }
  });

  // Build table rows
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  cards.forEach((card) => {
    const panel = card.querySelector('.rlc-panel_inner') || card;
    const img = panel.querySelector('img');
    const textCell = document.createElement('div');
    // Collect all text content in panel except image
    Array.from(panel.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG') {
        textCell.appendChild(node.cloneNode(true));
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textCell.appendChild(document.createTextNode(node.textContent));
      }
    });
    rows.push([img ? img.cloneNode(true) : '', textCell]);
  });

  // Create table with correct header colspan
  const table = document.createElement('table');
  // Header row with colspan=2
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  const th = document.createElement('th');
  th.setAttribute('colspan', '2');
  th.textContent = headerRow[0];
  trHead.appendChild(th);
  thead.appendChild(trHead);
  table.appendChild(thead);

  // Body rows
  const tbody = document.createElement('tbody');
  for (let i = 1; i < rows.length; i++) {
    const tr = document.createElement('tr');
    rows[i].forEach((cell) => {
      const td = document.createElement('td');
      if (cell instanceof Element) {
        td.appendChild(cell);
      } else if (cell) {
        td.textContent = cell;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  element.replaceWith(table);
}
