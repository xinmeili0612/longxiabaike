import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const chatWithAI = async (message: string, history: { role: string, parts: { text: string }[] }[]) => {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...history,
      { role: "user", parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: `你是一个专门为“龙虾百科”小程序提供支持的 AI 助手，名字叫“虾聊天”。
你的任务是回答用户关于 OpenClaw（龙虾）的问题。

回复原则：
1. 尽量说人话，少用复杂术语。
2. 回复不要太长，保持简洁。
3. 语气要友好、真诚，有陪伴感。
4. 回答后尽量附一个动作建议，例如引导用户去看某篇教程。

常见引导建议：
- 如果用户是小白，建议看《龙虾是什么》或《小白第一次怎么开始》。
- 如果用户遇到报错，建议看《常见问题怎么排查》。
- 如果用户想看案例，建议去“虾日记”板块。`,
    }
  });

  const response = await model;
  return response.text;
};
