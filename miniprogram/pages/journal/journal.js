const { journals } = require('../../data/content');
Page({
  data: {
    tabs: ['全部', '实战', '踩坑', '成长'],
    activeTab: '全部',
    journals,
    filtered: journals
  },
  chooseTab(e) {
    const activeTab = e.currentTarget.dataset.tab;
    const filtered = activeTab === '全部' ? this.data.journals : this.data.journals.filter(item => item.tag === activeTab);
    this.setData({ activeTab, filtered });
  },
  openDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/journal-detail/journal-detail?id=${id}` });
  }
});
