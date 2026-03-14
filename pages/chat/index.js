Page({
  data: {
    input: '',
    messages: [
      {
        role: 'model',
        text: '你好，我是虾聊天。你可以直接问我 OpenClaw 是什么、适合谁、怎么开始。'
      }
    ],
    isTyping: false
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
  },

  onInput(e) {
    this.setData({ input: e.detail.value || '' });
  },

  async sendMessage() {
    const text = (this.data.input || '').trim();
    if (!text || this.data.isTyping) return;

    // 添加用户消息
    const userMsg = { role: 'user', text };
    const messages = this.data.messages.concat(userMsg);
    this.setData({ input: '', messages, isTyping: true });

    try {
      // 调用云开发 AI 能力
      const res = await wx.cloud.extend.AI.createModel('deepseek').streamText({
        data: {
          model: 'deepseek-v3.2',
          messages: messages.map(msg => ({
            role: msg.role === 'model' ? 'assistant' : msg.role,
            content: msg.text
          }))
        }
      });

      let assistantText = '';
      
      // 监听流式返回
      for await (let event of res.eventStream) {
        if (event.data === '[DONE]') {
          break;
        }
        
        const data = JSON.parse(event.data);
        const content = data?.choices?.[0]?.delta?.content;
        
        if (content) {
          assistantText += content;
          // 实时更新消息
          this.setData({
            messages: this.data.messages.concat([
              { role: 'model', text: assistantText, streaming: true }
            ])
          });
        }
      }

      // 流式结束，更新最后一条消息
      if (assistantText) {
        const finalMessages = this.data.messages.map((msg, idx) => {
          if (idx === this.data.messages.length - 1 && msg.role === 'model') {
            return { ...msg, streaming: false };
          }
          return msg;
        });
        this.setData({ messages: finalMessages, isTyping: false });
      }
    } catch (err) {
      console.error('AI 调用失败：', err);
      this.setData({ 
        messages: this.data.messages.concat([
          { role: 'model', text: '抱歉，我现在有点累，请稍后再试。' }
        ]),
        isTyping: false 
      });
    }
  },

  quickAsk(e) {
    const text = e.currentTarget.dataset.text;
    // 直接调用 sendMessage 的逻辑
    this.setData({ input: text }, () => {
      this.sendMessage();
    });
  }
});
