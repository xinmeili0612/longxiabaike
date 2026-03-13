const { diaries } = require('../../utils/store');

Page({
  data: {
    categories: ['全部', '实战', '踩坑', '成长'],
    activeCategory: '全部',
    filteredDiaries: []
  },

  onLoad() {
    this.applyFilters();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
  },

  switchCategory(e) {
    this.setData({ activeCategory: e.currentTarget.dataset.category }, () => this.applyFilters());
  },

  openDetail(e) {
    const { id, kind } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/detail/index?id=${id}&kind=${kind}` });
  },

  applyFilters() {
    const { activeCategory } = this.data;
    const filteredDiaries = diaries
      .filter((item) => activeCategory === '全部' || item.category === activeCategory)
      .map((item, index) => ({ ...item, featured: index === 0 }));
    this.setData({ filteredDiaries });
  }
});
