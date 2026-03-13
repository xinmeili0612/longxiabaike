Component({
  data: {
    selected: 0,
    color: '#8E8E93',
    selectedColor: '#F08A24',
    list: [
      {
        pagePath: '/pages/tutorials/index',
        text: '虾百科',
        short: '百科'
      },
      {
        pagePath: '/pages/chat/index',
        text: '虾聊天',
        short: '聊天',
        center: true
      },
      {
        pagePath: '/pages/diary/index',
        text: '虾日记',
        short: '日记'
      }
    ]
  },
  methods: {
    switchTab(e) {
      const { index, path } = e.currentTarget.dataset;
      if (typeof index === 'number') {
        this.setData({ selected: index });
      }
      wx.switchTab({ url: path });
    }
  }
})
