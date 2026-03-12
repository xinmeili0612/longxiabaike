Page({
  data: {
    quicks: ['龙虾是什么？', '小白先学什么？', '龙虾能做什么？', '我这个问题怎么解决？'],
    messages: [
      { role: 'assistant', text: '你好，我是虾聊天。你可以直接问我龙虾是什么、先学什么、哪里报错了。' }
    ],
    input: ''
  },
  tapQuick(e) {
    const text = e.currentTarget.dataset.text;
    this.ask(text);
  },
  onInput(e) {
    this.setData({ input: e.detail.value });
  },
  submit() {
    const text = (this.data.input || '').trim();
    if (!text) return;
    this.ask(text);
    this.setData({ input: '' });
  },
  ask(text) {
    const messages = this.data.messages.concat(
      { role: 'user', text },
      { role: 'assistant', text: this.reply(text) }
    );
    this.setData({ messages });
  },
  reply(text) {
    if (text.includes('小白')) return '如果你是小白，建议先看《龙虾是什么？》和《小白第一次怎么开始？》这两篇教程。先理解，再上手。';
    if (text.includes('区别')) return '龙虾和普通 AI 的区别是：它更强调执行任务、装技能和跑流程，不只是回答问题。建议你再看《龙虾和普通 AI 有什么区别？》。';
    if (text.includes('报错') || text.includes('问题')) return '先别慌，先确认你卡在安装、配置还是使用。建议你把报错原文发出来，我再继续帮你判断。';
    return '你这个问题我建议先拆成“你想做什么”和“你现在卡在哪”。如果你愿意，可以直接换一种更具体的问法，我会更好帮你。';
  }
});
