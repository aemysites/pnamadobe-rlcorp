/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get the main section
  const section = element.querySelector('section.img-link.fullwidth.overlay.first-level');
  if (!section) return;

  // --- Row 1: Header ---
  const headerRow = ['Hero (hero21)'];

  // --- Row 2: Background Image ---
  let imageCell = '';
  const pictureHolder = section.querySelector('.corp-picture-holder picture');
  if (pictureHolder) {
    // Use the <img> element with absolute URL if possible
    const img = pictureHolder.querySelector('img');
    if (img) {
      // Ensure the image has an absolute src
      const src = img.src || img.getAttribute('src');
      if (src) {
        const image = document.createElement('img');
        image.src = src;
        image.alt = img.alt || '';
        imageCell = image;
      }
    }
  }

  // --- Row 3: Content ---
  const contentElements = [];
  // Title
  const title = section.querySelector('.copy-cont .title');
  if (title) {
    // Clone to avoid moving from DOM
    contentElements.push(title.cloneNode(true));
  }

  // Subheading: Prefer desktop/tablet version, fallback to mobile
  let subheading = section.querySelector('.copy-cont .deck.tablet-only.desktop-only');
  if (!subheading) {
    // Fallback to mobile-only deck
    subheading = section.parentElement.querySelector('.deck.mobile-only');
  }
  if (subheading) {
    contentElements.push(subheading.cloneNode(true));
  }

  // CTA Button
  const ctaButtonDiv = section.querySelector('.corp-cta-button');
  if (ctaButtonDiv) {
    // Find the <a> inside
    const ctaLink = ctaButtonDiv.querySelector('a');
    if (ctaLink) {
      contentElements.push(ctaLink.cloneNode(true));
    }
  }

  // Fallback: If no subheading found at all, check for any .deck in section
  if (!contentElements.some(el => el.classList && el.classList.contains('deck'))) {
    const fallbackDeck = section.querySelector('.deck');
    if (fallbackDeck) {
      contentElements.push(fallbackDeck.cloneNode(true));
    }
  }

  // Compose table rows
  const rows = [
    headerRow,
    [imageCell],
    [contentElements]
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
