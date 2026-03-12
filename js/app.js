(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  const data = window.LOBSTER_DATA || { tabs: [], articles: [], categories: [], faq: [] };

  const tabRoot = document.querySelector('[data-tabs]');
  if (tabRoot) {
    tabRoot.innerHTML = data.tabs.map(item => {
      const isActive = item.href === path;
      const cls = item.kind === 'primary'
        ? `tab tab-primary${isActive ? ' active' : ''}`
        : `tab${isActive ? ' active' : ''}`;
      return `<a class="${cls}" href="${item.href}"><span>${item.label}</span></a>`;
    }).join('');
  }

  const renderArticles = (list) => list.map(item => `
    <a class="article-item" href="${item.href}">
      <div class="article-title">${item.title}</div>
      <div class="article-desc">${item.desc}</div>
      <div class="article-meta"><span>${item.readTime}</span><span>${item.tags.join(' · ')}</span></div>
    </a>
  `).join('');

  const articleList = document.querySelector('[data-article-list]');
  if (articleList) articleList.innerHTML = renderArticles(data.articles);

  const categoryList = document.querySelector('[data-category-list]');
  if (categoryList) categoryList.innerHTML = data.categories.map(item => `<span class="tag">${item.name}</span>`).join('');

  const faqList = document.querySelector('[data-faq-list]');
  if (faqList) {
    faqList.innerHTML = data.faq.map(item => `
      <div class="faq-item">
        <div class="faq-q">${item.q}</div>
        <div class="faq-a">${item.a}</div>
      </div>
    `).join('');
  }

  const searchInput = document.querySelector('[data-search]');
  const searchList = document.querySelector('[data-search-list]');
  if (searchInput && searchList) {
    const render = (q='') => {
      const keyword = q.trim().toLowerCase();
      const filtered = !keyword ? data.articles : data.articles.filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.desc.toLowerCase().includes(keyword) ||
        item.tags.join(' ').toLowerCase().includes(keyword)
      );
      searchList.innerHTML = renderArticles(filtered);
    };
    render();
    searchInput.addEventListener('input', e => render(e.target.value));
  }
})();
