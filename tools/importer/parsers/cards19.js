/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the main image from a .corp-picture-holder.first-level
  function getMainImage(section) {
    const imgHolder = section.querySelector('.corp-picture-holder.first-level');
    if (imgHolder) {
      const img = imgHolder.querySelector('img');
      if (img) return img.cloneNode(true);
    }
    return null;
  }

  // Helper to extract all text content from .copy-cont (including logo and ctas)
  function getTextContent(section) {
    const frag = document.createDocumentFragment();
    const copyCont = section.querySelector('.copy-cont');
    if (!copyCont) return frag;

    // Find the first child div inside .copy-cont (contains location, logo, address, phone)
    const infoDiv = copyCont.querySelector('div');
    if (infoDiv) {
      // Location as heading
      const location = infoDiv.querySelector('.hospitality-location');
      if (location) {
        const h3 = document.createElement('h3');
        h3.textContent = location.textContent.trim();
        frag.appendChild(h3);
      }
      // Logo image (optional)
      const logoHolder = infoDiv.querySelector('.hospitality-logo img');
      if (logoHolder) {
        frag.appendChild(logoHolder.cloneNode(true));
      }
      // Address
      const address = infoDiv.querySelector('.hospitality-address');
      if (address) {
        const p = document.createElement('p');
        p.textContent = address.textContent.trim();
        frag.appendChild(p);
      }
      // Phone
      const phone = infoDiv.querySelector('.hospitality-phone');
      if (phone) {
        const p = document.createElement('p');
        p.textContent = phone.textContent.trim();
        frag.appendChild(p);
      }
    }
    // CTA (Explore Now)
    const ctaBtn = copyCont.querySelector('.corp-secondary-button a');
    if (ctaBtn) {
      frag.appendChild(document.createElement('br'));
      frag.appendChild(ctaBtn.cloneNode(true));
    }
    return frag;
  }

  // Compose table rows
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards19)'];
  rows.push(headerRow);

  // Find all card blocks
  const cardBlocks = element.querySelectorAll('.corp-content-asset');
  cardBlocks.forEach((block) => {
    const section = block.querySelector('section');
    if (!section) return;
    // First column: main image
    const mainImg = getMainImage(section);
    // Second column: text content (all text, logo, cta)
    const textFrag = getTextContent(section);
    // Compose row
    const row = [mainImg, textFrag];
    rows.push(row);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
