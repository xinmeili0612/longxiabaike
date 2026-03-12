export interface Tutorial {
  id: string;
  title: string;
  category: '认知' | '入门' | '使用';
  description: string;
  content: string;
}

export interface Diary {
  id: string;
  title: string;
  category: '实战' | '踩坑' | '成长';
  description: string;
  content: string;
  tags: string[];
}

export const tutorials: Tutorial[] = [
  {
    id: 't1',
    title: '龙虾是什么？',
    category: '认知',
    description: '快速了解 OpenClaw 引擎的本质。',
    content: `
# 龙虾是什么？

“龙虾”是社区对 **OpenClaw** 项目的昵称。它是一个开源项目，旨在重新实现 1997 年经典游戏《船长爪》(Captain Claw) 的引擎。

### 为什么叫龙虾？
因为游戏主角是一只猫，而引擎名字叫 Claw（爪子），听起来很像龙虾的钳子，所以大家亲切地称它为“龙虾”。

### 它能做什么？
- 在现代电脑上玩《船长爪》。
- 支持高分辨率和宽屏。
- 支持加载社区制作的各种新地图。
    `
  },
  {
    id: 't2',
    title: '龙虾和普通 AI 的区别',
    category: '认知',
    description: '搞清楚它是一个游戏引擎还是一个聊天机器人。',
    content: `
# 龙虾和普通 AI 的区别

这是一个常见的误区！

1. **龙虾 (OpenClaw)**：是一个**游戏引擎**。它是用来运行游戏的，不是用来写代码或画画的。
2. **普通 AI (如 ChatGPT)**：是**大语言模型**。

虽然我们在这个小程序里用了 AI 助手来教你用龙虾，但“龙虾”本身是一个让你重温经典游戏的工具。
    `
  },
  {
    id: 't3',
    title: '小白第一次怎么开始？',
    category: '入门',
    description: '手把手教你跑通第一个游戏画面。',
    content: `
# 小白第一次怎么开始？

别担心，非常简单！

### 第一步：准备资源
你需要原版游戏的 \`CLAW.REZ\` 文件。这是游戏的“灵魂”，龙虾引擎只是“身体”。

### 第二步：下载引擎
去 GitHub 下载对应你系统的 OpenClaw 压缩包并解压。

### 第三步：合体
把 \`CLAW.REZ\` 放到解压后的文件夹里。

### 第四步：启动
双击 \`OpenClaw.exe\`，开始你的海盗之旅！
    `
  },
  {
    id: 't4',
    title: '常见问题怎么排查？',
    category: '使用',
    description: '遇到黑屏、没声音怎么办？',
    content: `
# 常见问题排查

### 1. 启动就黑屏
- **检查文件**：确认 \`CLAW.REZ\` 文件名是否全大写，且放在了正确位置。
- **路径问题**：确保文件夹路径中没有奇怪的特殊字符。

### 2. 没有声音
- 检查系统音量。
- 查看 \`config.xml\` 中的音频设置是否被禁用。

### 3. 游戏速度太快
- 在设置中开启垂直同步 (VSync)。
    `
  }
];

export const diaries: Diary[] = [
  {
    id: 'd1',
    title: '我怎么用龙虾提升工作效率',
    category: '实战',
    description: '利用游戏间隙放松，反而让思路更清晰。',
    tags: ['效率', '放松'],
    content: `
# 实战：游戏与工作的平衡

很多人觉得玩游戏浪费时间，但我发现用龙虾玩《船长爪》是我最好的解压方式。

### 过程记录
每工作 2 小时，我会打一关《船长爪》。因为这游戏需要高度集中注意力，反而能让我从繁琐的代码中抽离出来。

### 结果总结
这种“硬核放松”比刷短视频更有效，打完一关后，我的大脑像重启了一样。
    `
  },
  {
    id: 'd2',
    title: '第一次用龙虾踩的那些坑',
    category: '踩坑',
    description: '文件名大小写居然也会导致报错？',
    tags: ['新手', '报错'],
    content: `
# 踩坑复盘：文件名是关键

我折腾了两个小时才发现，我的文件叫 \`claw.rez\`，而程序在找 \`CLAW.REZ\`。

### 经验提醒
在某些系统（尤其是 Linux）上，文件名是区分大小写的。

### 建议
不管你在什么系统上，统一把资源文件名改成大写，能省去 90% 的麻烦。
    `
  },
  {
    id: 'd3',
    title: '从小白到能跑起来，我经历了什么',
    category: '成长',
    description: '一个文科生的龙虾探索之旅。',
    tags: ['成长', '心得'],
    content: `
# 成长记录：我不懂技术也能行

刚开始看到 GitHub、XML 这些词我头都大了。

### 过程
我先看了《龙虾是什么》，然后跟着《小白第一次怎么开始》一步步操作。

### 心得
其实没那么难，只要你不怕报错，多去问问 AI 助手，总能解决的。
    `
  }
];
