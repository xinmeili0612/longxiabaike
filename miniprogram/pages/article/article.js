const { tutorials } = require('../../data/content');
Page({
  data: {
    article: null
  },
  onLoad(query) {
    const article = tutorials.find(item => item.id === query.id) || tutorials[0];
    this.setData({ article });
  },
  goChat() {
    wx.switchTab({ url: '/pages/chat/chat' });
  }
});
