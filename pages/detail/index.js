const { getTutorialById, getDiaryById } = require('../../utils/store');
const { parseMarkdown } = require('../../utils/parser');

Page({
  data: {
    title: '',
    description: '',
    blocks: [],
    kind: 'tutorial'
  },

  onLoad(query) {
    const { id = '', kind = 'tutorial' } = query || {};
    const item = kind === 'diary' ? getDiaryById(id) : getTutorialById(id);
    if (!item) {
      wx.showToast({ title: '内容不存在', icon: 'none' });
      return;
    }

    wx.setNavigationBarTitle({ title: kind === 'diary' ? '虾日记' : '虾百科' });
    this.setData({
      title: item.title,
      description: item.description,
      kind,
      blocks: parseMarkdown(item.content)
    });
  },

  goChat() {
    wx.switchTab({ url: '/pages/chat/index' });
  }
});
