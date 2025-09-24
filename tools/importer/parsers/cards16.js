/* global WebImporter */
export default function parse(element, { document }) {
  // Get all card sections
  const sections = Array.from(element.querySelectorAll(':scope > section.two-columns'));

  // Header row as required
  const headerRow = ['Cards (cards16)'];
  const rows = [headerRow];

  sections.forEach((section) => {
    // Defensive: find the tile
    const tile = section.querySelector('.corp-bio-reg-tile');
    if (!tile) return;

    // Get image element (first .img-cont .corp-picture-holder img)
    const img = tile.querySelector('.img-cont .corp-picture-holder img');
    if (!img) return; // skip if missing

    // Get text content from the front face
    const front = tile.querySelector('.corp-bio-reg-face.corp-bio-front');
    if (!front) return;
    const name = front.querySelector('.leader-name');
    const role = front.querySelector('.leader-role');
    const bio = front.querySelector('.leader-bio');

    // Compose text cell
    const textCell = document.createElement('div');
    // Always clone nodes to avoid removing them from the DOM
    if (name) {
      textCell.appendChild(name.cloneNode(true));
    }
    if (role) {
      textCell.appendChild(role.cloneNode(true));
    }
    if (bio) {
      // If bio contains a corp-bio element, use its text content
      const corpBio = bio.querySelector('corp-bio');
      if (corpBio) {
        // Use all text content inside corp-bio
        Array.from(corpBio.childNodes).forEach((node) => {
          textCell.appendChild(node.cloneNode(true));
        });
      } else {
        // Fallback: use bio's text content
        textCell.appendChild(bio.cloneNode(true));
      }
    }

    rows.push([img.cloneNode(true), textCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the element with the block
  element.replaceWith(block);
}
