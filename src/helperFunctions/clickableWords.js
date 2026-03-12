const attachClickHandlers = (cat, handleWordClick) => {
    if (!cat) {
      return;
    } 
    const descriptions = Array.isArray(cat) ? cat : [cat];

    descriptions.forEach((desc) => {
      desc.querySelectorAll('.clickable-text').forEach((el) => {
        el.removeEventListener('click', handleWordClick);
        el.addEventListener('click', handleWordClick);
      });
    });
  }

export default attachClickHandlers;