const { tutorials } = require('../../data/content');
Page({
  data: {
    keyword: '',
    categories: ['全部', '认知类', '入门类', '使用类'],
    activeCategory: '全部',
    tutorials,
    filtered: tutorials
  },
  onSearch(e) {
    const keyword = e.detail.value || '';
    this.setData({ keyword });
    this.applyFilter(keyword, this.data.activeCategory);
  },
  chooseCategory(e) {
    const activeCategory = e.currentTarget.dataset.category;
    this.setData({ activeCategory });
    this.applyFilter(this.data.keyword, activeCategory);
  },
  applyFilter(keyword, category) {
    const text = (keyword || '').trim();
    const filtered = this.data.tutorials.filter(item => {
      const categoryOk = category === '全部' || item.category === category;
      const keywordOk = !text || item.title.includes(text) || item.intro.includes(text);
      return categoryOk && keywordOk;
    });
    this.setData({ filtered });
  },
  openDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/article/article?id=${id}` });
  }
});
