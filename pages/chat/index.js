Page({
  data: {
    input: '',
    quickPrompts: ['OpenClaw 是什么？', 'OpenClaw 适合谁？', 'OpenClaw 怎么开始？', '微信小程序怎么部署？'],
    messages: [
      {
        role: 'model',
        text: '你好，我是虾聊天。你可以直接问我 OpenClaw 是什么、适合谁、怎么开始。'
      }
    ]
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
  },

  onInput(e) {
    this.setData({ input: e.detail.value || '' });
  },

  sendMessage() {
    const text = (this.data.input || '').trim();
    if (!text) return;

    const reply = this.buildReply(text);
    const messages = this.data.messages.concat([
      { role: 'user', text },
      { role: 'model', text: reply }
    ]);

    this.setData({ input: '', messages });
  },

  quickAsk(e) {
    const text = e.currentTarget.dataset.text;
    const reply = this.buildReply(text);
    const messages = this.data.messages.concat([
      { role: 'user', text },
      { role: 'model', text: reply }
    ]);
    this.setData({ messages });
  },

  buildReply(text) {
    if (text.includes('是什么')) {
      return 'OpenClaw 不是单独的大模型，而是一套把 AI 变成长期可用助手的系统。你可以先去虾百科里的认知栏目，从“OpenClaw 到底是什么？”开始看。';
    }
    if (text.includes('适合谁') || text.includes('适合什么人')) {
      return '它特别适合内容创作者、信息整理很多的人、想把 AI 接进工作流的人，以及想做个人数字助理的人。建议你先看认知栏目里的“OpenClaw 最适合哪 4 类人？”。';
    }
    if (text.includes('怎么开始') || text.includes('入门')) {
      return '建议先去“入门”栏目，按准备服务器、配置模型、配置飞书机器人的顺序看。先跑通第一只小龙虾，再谈更高级玩法。';
    }
    if (text.includes('小程序') || text.includes('微信')) {
      return '如果你是在做微信小程序，先把小程序结构跑通，再去调整内容页、底部导航和聊天页体验。先跑通，再做精致，是最稳的顺序。';
    }
    return '你可以继续直接问我更具体的问题，比如：OpenClaw 是什么、适合谁、怎么开始，或者小程序应该怎么改。';
  }
});
