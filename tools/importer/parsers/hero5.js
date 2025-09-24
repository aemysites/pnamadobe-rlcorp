/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the background image from the <picture> tag
  let imgEl = null;
  const picture = element.querySelector('picture');
  if (picture) {
    imgEl = picture.querySelector('img');
  }

  // Extract headline and breadcrumb
  let headline = null;
  let breadcrumb = null;
  const copygroup = element.querySelector('.rlc-copygroup');
  if (copygroup) {
    headline = copygroup.querySelector('h1');
    breadcrumb = copygroup.querySelector('.plp-info-breadcrumb-path');
  }

  // Compose the text cell: include breadcrumb and headline, preserving semantic meaning
  const textCellContent = [];
  if (breadcrumb) {
    textCellContent.push(breadcrumb);
  }
  if (headline) {
    textCellContent.push(headline);
  }

  // Table rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [imgEl ? imgEl : ''];
  const textRow = [textCellContent.length ? textCellContent : ''];

  // Create the block table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
