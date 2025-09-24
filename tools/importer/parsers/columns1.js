/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a link for non-image src elements (e.g., video)
  function createSrcLink(src, text) {
    const a = document.createElement('a');
    a.href = src.startsWith('//') ? `https:${src}` : src;
    a.textContent = text || src;
    a.target = '_blank';
    return a;
  }

  // Get direct left/right columns
  const cols = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: expect 2 columns
  const leftCol = cols[0];
  const rightCol = cols[1];

  // LEFT COLUMN: Get text content (usually a paragraph)
  let leftContent = [];
  if (leftCol) {
    // Find all paragraphs or text groups
    const textGroups = leftCol.querySelectorAll('.rlc-textgroup, p');
    textGroups.forEach(group => {
      // If it's a textgroup, get its children
      if (group.classList.contains('rlc-textgroup')) {
        leftContent.push(...group.children);
      } else {
        leftContent.push(group);
      }
    });
  }

  // RIGHT COLUMN: Gather icons and video
  let rightContent = [];
  if (rightCol) {
    // Icons
    const icons = Array.from(rightCol.querySelectorAll('.rlc-icon'));
    if (icons.length) {
      rightContent.push(...icons);
    }
    // Video section
    const videoSection = rightCol.querySelector('.rlc-hasvideo');
    if (videoSection) {
      // Add placeholder image if present
      const placeholderImg = videoSection.querySelector('img.rlc-image');
      if (placeholderImg) rightContent.push(placeholderImg);
      // Add video link if present
      const videoContainer = videoSection.querySelector('.rlc-videocontainer');
      if (videoContainer && videoContainer.dataset.video) {
        rightContent.push(createSrcLink(videoContainer.dataset.video, 'Video'));
      }
    }
  }

  // Build the table rows
  const headerRow = ['Columns block (columns1)'];
  const contentRow = [leftContent, rightContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the element
  element.replaceWith(table);
}
