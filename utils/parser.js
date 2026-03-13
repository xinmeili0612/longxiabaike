function normalizeLines(markdown) {
  return (markdown || '')
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.trimEnd());
}

function parseInline(text) {
  return (text || '').replace(/\*\*(.*?)\*\*/g, '$1');
}

function parseMarkdown(markdown) {
  const lines = normalizeLines(markdown);
  const blocks = [];
  let paragraph = [];
  let list = [];
  let listType = '';

  function flushParagraph() {
    if (!paragraph.length) return;
    blocks.push({ type: 'p', text: parseInline(paragraph.join(' ')) });
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    blocks.push({ type: listType || 'ul', items: list.map(parseInline) });
    list = [];
    listType = '';
  }

  lines.forEach((raw) => {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    if (line.startsWith('# ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'h1', text: parseInline(line.slice(2)) });
      return;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'h2', text: parseInline(line.slice(3)) });
      return;
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'h3', text: parseInline(line.slice(4)) });
      return;
    }

    if (/^-\s+/.test(line)) {
      flushParagraph();
      if (listType && listType !== 'ul') flushList();
      listType = 'ul';
      list.push(line.replace(/^-\s+/, ''));
      return;
    }

    if (/^\d+[）\.]\s+/.test(line)) {
      flushParagraph();
      if (listType && listType !== 'ol') flushList();
      listType = 'ol';
      list.push(line.replace(/^\d+[）\.]\s+/, ''));
      return;
    }

    flushList();
    paragraph.push(line);
  });

  flushParagraph();
  flushList();
  return blocks;
}

module.exports = {
  parseMarkdown
};
