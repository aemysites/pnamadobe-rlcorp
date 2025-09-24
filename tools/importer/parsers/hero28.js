/* global WebImporter */
export default function parse(element, { document }) {
  // Find the deepest asset div
  let assetDiv = element.querySelector('.corp-content-asset') || element;
  const header = assetDiv.querySelector('header');

  // --- Row 2: Background Image ---
  let imageCell = '';
  if (header) {
    const pictureHolder = header.querySelector('.corp-picture-holder');
    if (pictureHolder) {
      const img = pictureHolder.querySelector('img');
      if (img) {
        imageCell = img; // Reference the actual <img> element
      }
    }
  }

  // --- Row 3: Headline/Text ---
  let textCell = '';
  if (header) {
    const copyCont = header.querySelector('.copy-cont');
    if (copyCont) {
      // Gather all heading and paragraph elements inside copyCont
      const textFragments = [];
      // Headings
      copyCont.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => textFragments.push(h));
      // Paragraphs
      copyCont.querySelectorAll('p').forEach(p => textFragments.push(p));
      // If there are any fragments, wrap them in a div
      if (textFragments.length) {
        const wrapper = document.createElement('div');
        textFragments.forEach(el => wrapper.appendChild(el.cloneNode(true)));
        textCell = wrapper;
      }
    }
  }

  // Table rows
  const headerRow = ['Hero (hero28)'];
  const imageRow = [imageCell];
  const textRow = [textCell];

  const cells = [headerRow, imageRow, textRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
