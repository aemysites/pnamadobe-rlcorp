/* global WebImporter */
export default function parse(element, { document }) {
  // Get all slides
  const slides = Array.from(
    element.querySelectorAll('.flickity-slider > .corp-slide')
  );

  // Table header row as per block requirements
  const headerRow = ['Carousel (carousel20)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // --- IMAGE CELL ---
    const img = slide.querySelector('picture img');
    if (!img) return;

    // --- TEXT CELL ---
    // Find the button link (CTA) and its text
    const ctaDiv = slide.querySelector('.corp-secondary-button');
    let textCellContent = [];

    // Try to get heading from the CTA link
    if (ctaDiv) {
      const link = ctaDiv.querySelector('a');
      if (link) {
        // Heading (as h2)
        const heading = document.createElement('h2');
        heading.textContent = link.textContent.trim();
        textCellContent.push(heading);
        // CTA link (clone)
        textCellContent.push(link.cloneNode(true));
      }
    }

    // Try to get any additional text from the slide
    // Look for .corp-relative > .corp-picture-holder + a.hotspot sibling (not used for text)
    // Instead, check for any text nodes or elements in .corp-relative (excluding images and links)
    const relativeDiv = slide.querySelector('.corp-relative');
    if (relativeDiv) {
      // Get all text nodes that are not inside <picture> or <a>
      Array.from(relativeDiv.childNodes).forEach((node) => {
        if (
          node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
        ) {
          textCellContent.push(node.textContent.trim());
        }
      });
    }

    // If no text content found, fallback to empty string
    if (textCellContent.length === 0) textCellContent = [''];

    rows.push([
      img,
      textCellContent,
    ]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
