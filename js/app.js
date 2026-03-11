(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  const data = window.LOBSTER_DATA || { nav: [] };
  const navRoot = document.querySelector('[data-nav]');
  if (navRoot) {
    navRoot.innerHTML = data.nav.map(item => {
      const active = item.href === path ? 'nav active' : 'nav';
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    }).join('');
  }
  const footer = document.querySelector('[data-footer]');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-card">
        <div class="footer-title">龙虾百科 · 正式版开发中</div>
        <div class="footer-desc">当前已完成核心内容结构、路线测试和在线预览。下一阶段将继续补搜索、文章体系、品牌视觉与更完整的产品交互。</div>
      </div>
    `;
  }
})();
