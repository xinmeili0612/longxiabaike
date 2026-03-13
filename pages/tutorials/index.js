const { tutorials } = require('../../utils/store');

Page({
  data: {
    categories: ['全部', '认知', '入门', '使用'],
    activeCategory: '全部',
    searchQuery: '',
    filteredTutorials: []
  },

  onLoad() {
    this.applyFilters();
  },

  onSearchInput(e) {
    this.setData({ searchQuery: e.detail.value || '' }, () => this.applyFilters());
  },

  switchCategory(e) {
    this.setData({ activeCategory: e.currentTarget.dataset.category }, () => this.applyFilters());
  },

  openDetail(e) {
    const { id, kind } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/detail/index?id=${id}&kind=${kind}` });
  },

  applyFilters() {
    const { activeCategory, searchQuery } = this.data;
    const keyword = searchQuery.trim();
    const filteredTutorials = tutorials.filter((item) => {
      const categoryMatch = activeCategory === '全部' || item.category === activeCategory;
      const keywordMatch = !keyword || item.title.includes(keyword) || item.description.includes(keyword);
      return categoryMatch && keywordMatch;
    });
    this.setData({ filteredTutorials });
  }
});
