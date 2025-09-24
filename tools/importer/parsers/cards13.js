/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the first descendant img in a picture
  function getImgFromPicture(picture) {
    if (!picture) return null;
    return picture.querySelector('img');
  }

  // Helper to get the download link (if present)
  function getDownloadLink(newsDownloadDiv) {
    if (!newsDownloadDiv) return null;
    const a = newsDownloadDiv.querySelector('a[href]');
    if (!a) return null;
    // Return a shallow clone with just the link text
    const link = document.createElement('a');
    link.href = a.href;
    link.target = a.target || '_blank';
    link.textContent = 'Download';
    return link;
  }

  // Helper to get the title link and date
  function getTitleAndDate(newsCopyDiv) {
    if (!newsCopyDiv) return { title: null, date: null };
    const titleDiv = newsCopyDiv.querySelector('.news-copy-title');
    const dateDiv = newsCopyDiv.querySelector('.news-copy-publish');
    let title = null;
    if (titleDiv) {
      const a = titleDiv.querySelector('a');
      if (a) {
        // Use h3 for heading semantics
        const h3 = document.createElement('h3');
        const link = document.createElement('a');
        link.href = a.href;
        link.textContent = a.textContent;
        h3.appendChild(link);
        title = h3;
      }
    }
    let date = null;
    if (dateDiv) {
      // Use a <p> for the date
      date = document.createElement('p');
      date.textContent = dateDiv.textContent;
      date.className = 'news-date';
    }
    return { title, date };
  }

  // Parse all cards in the block
  const headerRow = ['Cards (cards13)'];
  const rows = [headerRow];

  // Defensive: handle if element is a wrapper containing multiple .corp-news, or a single .corp-news
  let cardElements = [];
  if (element.classList.contains('corp-news')) {
    cardElements = [element];
  } else {
    cardElements = Array.from(element.querySelectorAll(':scope > .corp-news'));
  }

  // If no direct .corp-news children, maybe element IS the .corp-news
  if (cardElements.length === 0 && element.classList.contains('corp-news')) {
    cardElements = [element];
  }

  cardElements.forEach((card) => {
    // Image cell
    const thumbDiv = card.querySelector('.news-thumb .corp-picture-holder picture');
    const img = getImgFromPicture(thumbDiv);
    let imageCell = null;
    if (img) {
      imageCell = img;
    } else {
      // fallback: empty cell
      imageCell = '';
    }

    // Text cell: title, date, download link
    const newsCopyDiv = card.querySelector('.news-copy');
    const { title, date } = getTitleAndDate(newsCopyDiv);
    const downloadDiv = card.querySelector('.news-download');
    const downloadLink = getDownloadLink(downloadDiv);

    // Compose text cell
    const textCellContent = [];
    if (title) textCellContent.push(title);
    if (date) textCellContent.push(date);
    if (downloadLink) textCellContent.push(downloadLink);

    rows.push([imageCell, textCellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
