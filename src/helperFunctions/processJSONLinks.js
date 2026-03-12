function processLinksInHtml(rawHtml, activeLanguage) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, 'text/html');
  
  const links = doc.querySelectorAll('a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    
    if (href.startsWith('http://') || href.startsWith('https://')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
    else if (href.startsWith('/')) {
      const normalizedHref = `/${activeLanguage}${href}`;
      link.setAttribute('href', normalizedHref);
    }
  });

  return doc.body.innerHTML;
}

export default processLinksInHtml;