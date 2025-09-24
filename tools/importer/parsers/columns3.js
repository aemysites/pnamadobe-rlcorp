/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Columns block (columns3)'];

  // Defensive: Get all immediate child collaborator divs
  const collaborators = Array.from(element.querySelectorAll(':scope > div.rlc-collaborator'));

  // Defensive: Only keep those with an image inside
  const images = collaborators
    .map(div => div.querySelector('img'))
    .filter(img => !!img);

  // If there are no images, do nothing
  if (!images.length) return;

  // The visual screenshot shows a multi-column layout (3 columns in markdown example, but here it's a grid of logos)
  // We'll arrange all images in a single row, each in its own column for maximum flexibility
  // If there are more than 3 images, it's fine to have more columns
  const contentRow = images;

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
