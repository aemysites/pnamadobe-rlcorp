/* global WebImporter */
export default function parse(element, { document }) {
  // Only run on the first hero block in the sequence
  if (!element.matches('header.img-hero')) return;

  // Find all hero blocks in the same parent container as this element
  const parent = element.parentElement;
  const heroBlocks = Array.from(parent.querySelectorAll('header.img-hero'));

  // Extract images from each hero block
  const images = heroBlocks.map(hero => {
    const img = hero.querySelector('.corp-picture-holder img');
    return img || '';
  });

  // Only build the columns block if there are 2 or more images
  if (images.length >= 2) {
    const headerRow = ['Columns block (columns7)'];
    const contentRow = images;
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      contentRow,
    ], document);
    parent.replaceChild(table, heroBlocks[0]);
    // Remove the other hero blocks
    for (let i = 1; i < heroBlocks.length; i++) {
      parent.removeChild(heroBlocks[i]);
    }
  }
}
