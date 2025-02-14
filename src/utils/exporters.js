import TurndownService from 'turndown';

export const exportAsHTML = (content) => {
  return content;
};

export const exportAsMarkdown = (content) => {
  const turndownService = new TurndownService();
  return turndownService.turndown(content);
};

export const exportAsText = (content) => {
  const div = document.createElement('div');
  div.innerHTML = content;
  return div.textContent || div.innerText || '';
};