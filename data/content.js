window.LOBSTER_DATA = {
  tabs: [
    { href: 'index.html', label: '虾首页', kind: 'normal' },
    { href: 'advisor.html', label: '虾顾问', kind: 'primary' },
    { href: 'cases.html', label: '虾实战', kind: 'normal' }
  ],
  categories: [
    { key: 'beginner', name: '新手入门' },
    { key: 'install', name: '安装配置' },
    { key: 'practice', name: '真实实战' }
  ],
  articles: [
    {
      id: 'start-here',
      title: '第一次使用，先从哪里开始',
      href: 'article.html',
      desc: '给第一次接触 OpenClaw 的用户准备的最短学习路径。',
      readTime: '3 分钟',
      tags: ['新手', '开始', '路径']
    },
    {
      id: 'install-fast',
      title: '10 分钟完成安装的正确顺序',
      href: 'article.html',
      desc: '别来回折腾，先把安装链路跑通。',
      readTime: '5 分钟',
      tags: ['安装', '配置', '环境']
    },
    {
      id: 'first-result',
      title: '如何跑通第一个结果',
      href: 'article.html',
      desc: '第一次看到结果，比看十篇教程更重要。',
      readTime: '4 分钟',
      tags: ['上手', '结果', '闭环']
    }
  ],
  faq: [
    { q: 'OpenClaw 和普通 AI 最大区别是什么？', a: '普通 AI 偏回答问题，OpenClaw 更强调接任务、装 skills、跑流程和调用工具。' },
    { q: '完全小白应该先学什么？', a: '先学安装和第一次跑通，不要一上来试图理解全部概念。' },
    { q: '遇到报错怎么办？', a: '先去虾顾问，看安装、配置、路径、权限和依赖这几类常见问题。' }
  ]
};
