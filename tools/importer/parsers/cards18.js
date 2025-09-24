/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a corp-news block
  function getImage(corpNews) {
    const thumb = corpNews.querySelector('.news-thumb .corp-picture-holder picture');
    if (thumb) {
      // Use the <img> element inside <picture>
      const img = thumb.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Helper to extract text content from a corp-news block
  function getTextContent(corpNews) {
    const textContainer = document.createElement('div');
    // Title (as heading with link)
    const titleDiv = corpNews.querySelector('.news-copy-title');
    if (titleDiv) {
      const link = titleDiv.querySelector('a');
      if (link) {
        const h3 = document.createElement('h3');
        // Use link as-is inside heading
        h3.appendChild(link);
        textContainer.appendChild(h3);
      }
    }
    // Date (as paragraph)
    const dateDiv = corpNews.querySelector('.news-copy-publish');
    if (dateDiv) {
      const p = document.createElement('p');
      p.textContent = dateDiv.textContent.trim();
      textContainer.appendChild(p);
    }
    // Download button (as CTA link)
    const downloadDiv = corpNews.querySelector('.news-download');
    if (downloadDiv) {
      const downloadLink = downloadDiv.querySelector('a');
      if (downloadLink) {
        // Use the link, but keep only the inner text 'Download' as the CTA
        const cta = document.createElement('p');
        const link = document.createElement('a');
        link.href = downloadLink.href;
        link.target = '_blank';
        link.textContent = 'Download';
        cta.appendChild(link);
        textContainer.appendChild(cta);
      }
    }
    return textContainer;
  }

  // Find all corp-news blocks
  const corpNewsBlocks = Array.from(element.querySelectorAll('.corp-news'));

  // Build table rows
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];

  corpNewsBlocks.forEach((corpNews) => {
    const img = getImage(corpNews);
    const text = getTextContent(corpNews);
    rows.push([img, text]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
