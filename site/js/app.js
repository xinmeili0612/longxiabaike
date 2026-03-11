(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  const data = window.LOBSTER_DATA || { nav: [], tabs: [], articles: [], categories: [] };

  const navRoot = document.querySelector('[data-nav]');
  if (navRoot) {
    navRoot.innerHTML = data.nav.map(item => {
      const active = item.href === path ? 'nav active' : 'nav';
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    }).join('');
  }

  const tabRoot = document.querySelector('[data-tabs]');
  if (tabRoot) {
    tabRoot.innerHTML = data.tabs.map(item => {
      const active = item.href === path ? 'tab active' : 'tab';
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    }).join('');
  }

  const footer = document.querySelector('[data-footer]');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-card">
        <div class="footer-title">龙虾百科 · 正式版开发中</div>
        <div class="footer-desc">当前已完成核心信息架构、文章体系雏形、路线测试和在线预览。下一阶段将继续补搜索、文章详情体系、品牌视觉与更完整的产品交互。</div>
      </div>
    `;
  }

  const articleList = document.querySelector('[data-article-list]');
  if (articleList) {
    articleList.innerHTML = data.articles.map(item => `
      <a class="article-item" href="${item.href}">
        <div class="article-title">${item.title}</div>
        <div class="article-desc">${item.desc}</div>
        <div class="article-meta"><span>${item.readTime}</span><span>${item.tags.join(' · ')}</span></div>
      </a>
    `).join('');
  }

  const categoryList = document.querySelector('[data-category-list]');
  if (categoryList) {
    categoryList.innerHTML = data.categories.map(item => `<span class="tag">${item.name}</span>`).join('');
  }
})();
