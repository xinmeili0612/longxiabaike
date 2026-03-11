Page({
  data: {
    current: 0,
    answers: [],
    questions: [
      {
        title: '你现在最想用龙虾解决什么问题？',
        options: [
          { key: 'content', label: '写内容赚钱' },
          { key: 'efficiency', label: '提升效率' },
          { key: 'automation', label: '做自动化执行' }
        ]
      },
      {
        title: '你更希望先看到哪种结果？',
        options: [
          { key: 'fast-money', label: '尽快看到可变现结果' },
          { key: 'stable', label: '先把日常工作变轻松' },
          { key: 'cool', label: '先跑通一个酷一点的自动化' }
        ]
      }
    ],
    result: null
  },
  choose(e) {
    const key = e.currentTarget.dataset.key;
    const current = this.data.current;
    const answers = this.data.answers.slice();
    answers[current] = key;
    if (current < this.data.questions.length - 1) {
      this.setData({ answers, current: current + 1 });
    } else {
      const joined = answers.join('|');
      let result = {
        title: '内容创作路线',
        desc: '先从写公众号、写老福特、配图封面开始，最快感受到结果。',
        actions: ['先装内容类 skills', '先做一篇文章或一套图文', '先跑通一次发布链路']
      };
      if (joined.includes('efficiency') || joined.includes('stable')) {
        result = {
          title: '效率办公路线',
          desc: '先从文档整理、笔记、知识库和信息提炼开始，最容易从“聊天”升级到“干活”。',
          actions: ['先接文档和知识库', '先做一次会议/资料整理', '把高频重复动作做成固定流程']
        };
      }
      if (joined.includes('automation') || joined.includes('cool')) {
        result = {
          title: '自动化执行路线',
          desc: '先从浏览器、定时任务、消息通知这类可见结果最强的场景开始。',
          actions: ['先接浏览器/消息渠道', '先做一个定时提醒或自动采集任务', '再逐步扩到多步骤流程']
        };
      }
      this.setData({ answers, result });
    }
  },
  restart() {
    this.setData({ current: 0, answers: [], result: null });
  }
})
