/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get first image in hero block
  function getHeroImage(el) {
    const img = el.querySelector('picture img');
    return img || null;
  }

  // Helper: Get all hero text content (title, filter, etc)
  function getHeroText(el) {
    const copyCont = el.querySelector('.copy-cont');
    if (!copyCont) return null;
    const frag = document.createDocumentFragment();
    // Title
    const h1 = copyCont.querySelector('h1');
    if (h1) frag.appendChild(h1.cloneNode(true));
    // Desktop/tablet filter
    const overlays = copyCont.querySelectorAll('.overlay, .filter-copy');
    overlays.forEach(overlay => {
      frag.appendChild(overlay.cloneNode(true));
    });
    // Also include year filter form if present
    const yearFilter = copyCont.querySelector('.year-filter-cont');
    if (yearFilter) {
      frag.appendChild(yearFilter.cloneNode(true));
    }
    return frag.childNodes.length ? frag : null;
  }

  // --- Main block construction ---
  // 1. Header row
  const headerRow = ['Hero (hero11)'];

  // 2. Background image row
  const header = element.querySelector('header');
  let imageCell = '';
  if (header) {
    const img = getHeroImage(header);
    if (img) imageCell = img.cloneNode(true);
  }

  // 3. Text content row
  let textCell = '';
  if (header) {
    const textFrag = getHeroText(header);
    if (textFrag) textCell = textFrag;
  }

  // Build the table
  const cells = [
    headerRow,
    [imageCell],
    [textCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
