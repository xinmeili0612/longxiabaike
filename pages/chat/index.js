Page({
  data: {
    input: '',
    messages: [
      {
        role: 'model',
        text: '你好，我是虾聊天。你可以直接问 OpenClaw 是什么、适合谁、怎么开始，我会先用内置知识回答。'
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
    return '这一版我先把小程序 UI 和原生结构做好。下一步如果你要真接 AI，我可以继续把聊天接成后端 API 版本。';
  }
});
