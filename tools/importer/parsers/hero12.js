/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main section containing the hero content
  const section = element.querySelector(':scope section.img-link');
  if (!section) return;

  // Find the image (background)
  let img;
  const pictureHolder = section.querySelector('.corp-picture-holder');
  if (pictureHolder) {
    img = pictureHolder.querySelector('img');
  }

  // Find the text content container
  const copyCont = section.querySelector('.copy-cont');

  // Find headline (h2)
  let headline;
  if (copyCont) {
    headline = copyCont.querySelector('h2');
  }

  // Find call-to-action links (Logos, Images)
  let ctaLinks = [];
  if (copyCont) {
    const linksCont = copyCont.querySelector('.links-cont');
    if (linksCont) {
      // Each button is a div.corp-secondary-button containing an <a>
      const buttons = linksCont.querySelectorAll('.corp-secondary-button a');
      buttons.forEach((a) => {
        // Use the anchor directly
        ctaLinks.push(a);
      });
    }
  }

  // Build the table rows
  const headerRow = ['Hero (hero12)'];
  const imageRow = [img ? img : ''];

  // Compose the text and CTA row
  const textContent = [];
  if (headline) textContent.push(headline);
  if (ctaLinks.length) {
    // Wrap CTAs in a container for clarity
    const ctaDiv = document.createElement('div');
    ctaLinks.forEach((a) => {
      ctaDiv.appendChild(a);
    });
    textContent.push(ctaDiv);
  }
  const textRow = [textContent.length ? textContent : ''];

  // Create the block table
  const cells = [headerRow, imageRow, textRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
