/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get all immediate children of the section
  const children = Array.from(element.children);

  // --- 1. Table Header ---
  const headerRow = ['Hero (hero27)'];

  // --- 2. Background Image Row ---
  // Find a <picture> or <img> for the background image
  let imageEl = null;
  for (const child of children) {
    // Look for <picture> or <img> in any child
    if (child.tagName === 'PICTURE') {
      imageEl = child;
      break;
    } else if (child.querySelector('picture')) {
      imageEl = child.querySelector('picture');
      break;
    } else if (child.tagName === 'IMG') {
      imageEl = child;
      break;
    } else if (child.querySelector('img')) {
      imageEl = child.querySelector('img');
      break;
    }
  }
  // If no <picture>, try to find an <img> directly
  if (!imageEl) {
    imageEl = element.querySelector('img');
  }
  const imageRow = [imageEl ? imageEl : ''];

  // --- 3. Content Row (Headline, Subheadline, CTA) ---
  // Find the text content group
  let copyGroup = null;
  for (const child of children) {
    if (child.classList && child.classList.contains('rlc-copygroup')) {
      copyGroup = child;
      break;
    }
  }
  // Defensive: If not found, look for any <h1>, <h2>, <h3>, <p>
  let contentCell;
  if (copyGroup) {
    contentCell = copyGroup;
  } else {
    // Fallback: Collect all heading and paragraph elements
    const headings = element.querySelectorAll('h1, h2, h3, p');
    contentCell = Array.from(headings);
  }
  const contentRow = [contentCell];

  // --- 4. Assemble Table ---
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // --- 5. Replace original element ---
  element.replaceWith(table);
}
