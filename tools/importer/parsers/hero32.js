/* global WebImporter */
export default function parse(element, { document }) {
  // Find the background image (first <img> in the hero)
  const img = element.querySelector('img');

  // Find the heading/title (first <h1> in the hero)
  const h1 = element.querySelector('h1');

  // Compose the table rows according to the Hero (hero32) block spec
  const headerRow = ['Hero (hero32)'];
  const imageRow = [img ? img : '']; // Reference the actual image element if present
  const contentRow = [h1 ? h1 : '']; // Reference the actual heading element if present

  // Build the table
  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
