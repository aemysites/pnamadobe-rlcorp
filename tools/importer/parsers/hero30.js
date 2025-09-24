/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract image element (background image)
  let imgEl = null;
  const picHolder = element.querySelector('.corp-picture-holder');
  if (picHolder) {
    const picture = picHolder.querySelector('picture');
    if (picture) {
      imgEl = picture.querySelector('img');
    }
  }

  // 2. Extract heading/title (should be referenced, not cloned)
  let headingEl = null;
  const copyCont = element.querySelector('.copy-cont');
  if (copyCont) {
    headingEl = copyCont.querySelector('h1, h2, h3, h4, h5, h6');
  }

  // 3. Compose table rows
  const headerRow = ['Hero (hero30)']; // Must match block name exactly
  const imageRow = [imgEl ? imgEl : '']; // Reference image element if present
  const contentRow = [headingEl ? headingEl : '']; // Reference heading element if present

  // 4. Create table
  const table = WebImporter.DOMUtils.createTable([headerRow, imageRow, contentRow], document);
  element.replaceWith(table);
}
