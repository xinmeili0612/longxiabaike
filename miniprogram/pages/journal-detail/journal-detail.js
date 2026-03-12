const { journals } = require('../../data/content');
Page({
  data: { journal: null },
  onLoad(query) {
    const journal = journals.find(item => item.id === query.id) || journals[0];
    this.setData({ journal });
  },
  goChat() {
    wx.switchTab({ url: '/pages/chat/chat' });
  }
});
