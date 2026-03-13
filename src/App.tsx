/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  MessageSquare, 
  BookText,
  ChevronRight, 
  Search,
  Send,
  ArrowLeft,
  Loader2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { cn } from './utils';
import { tutorials, diaries, type Tutorial, type Diary } from './data';
import { chatWithAI } from './services/gemini';

type Tab = 'tutorials' | 'chat' | 'diary';
type View = 'list' | 'detail';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('tutorials');
  const [view, setView] = useState<View>('list');
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('全部');

  // AI Chat State
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (text?: string) => {
    const messageToSend = text || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage = messageToSend.trim();
    setInput('');
    chatInputRef.current?.blur();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await chatWithAI(userMessage, history);
      setMessages(prev => [...prev, { role: 'model', text: response || '抱歉，我没能理解。' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: '发生了一些错误，请稍后再试。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderHeader = () => {
    if (view === 'detail') {
      return (
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-[#FDE68A] px-4 py-4 flex items-center">
          <button 
            onClick={() => setView('list')}
            className="p-2 hover:bg-[#FFFBEB] rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#E07A00]" />
          </button>
          <h1 className="flex-1 text-center text-[18px] font-black text-black truncate pr-10">
            {selectedTutorial?.title || selectedDiary?.title}
          </h1>
        </header>
      );
    }

    const titles: Record<Tab, string> = {
      tutorials: '龙虾百科',
      chat: '虾聊天',
      diary: '虾日记'
    };

    return (
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-[#FDE68A] px-5 py-4 text-center transition-all">
        <h1 className="text-[24px] sm:text-[28px] font-black text-black tracking-tighter leading-tight">
          {titles[activeTab].slice(0, 2)}
          <span className="text-[#E07A00]">{titles[activeTab].slice(2)}</span>
        </h1>
        <p className="text-[10px] sm:text-[12px] text-[#6B7280] mt-1 font-bold uppercase tracking-[0.16em] opacity-80">
          {activeTab === 'tutorials' && '不用命令行 也能玩转小龙虾'}
          {activeTab === 'chat' && '你的本地龙虾管家'}
          {activeTab === 'diary' && '小白也能轻松玩转'}
        </p>
      </header>
    );
  };

  const renderTutorials = () => {
    const filtered = tutorials.filter(t => 
      (activeCategory === '全部' || t.category === activeCategory) &&
      (t.title.includes(searchQuery) || t.description.includes(searchQuery))
    );

    return (
      <div className="p-4 sm:p-5 space-y-4 sm:space-y-5 pb-6">
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E07A00] group-focus-within:scale-110 transition-transform" />
          <input 
            type="text"
            placeholder="搜索百科内容..."
            className="w-full bg-[#FFFBEB] border-2 border-[#FEF3C7] rounded-2xl py-3 pl-11 pr-4 text-[15px] focus:ring-4 focus:ring-[#F59E0B]/10 focus:border-[#F59E0B] transition-all placeholder-[#B45309]/40 font-bold outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['全部', '认知', '入门', '使用'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-xl text-[14px] font-black whitespace-nowrap transition-all border-2",
                activeCategory === cat 
                  ? "bg-[#E07A00] text-white border-[#E07A00] shadow-lg shadow-orange-500/20" 
                  : "bg-white text-[#4B5563] border-[#F3F4F6] hover:border-[#FEF3C7]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4">
          {filtered.map(t => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => { setSelectedTutorial(t); setSelectedDiary(null); setView('detail'); }}
              className="p-5 bg-[#FFFDF5] border-2 border-[#FEF3C7] rounded-[22px] hover:border-[#F59E0B] transition-all cursor-pointer group shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F59E0B]/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#B45309] bg-[#FEF3C7] px-2.5 py-1 rounded-lg">
                    {t.category}
                  </span>
                  <ChevronRight className="w-5 h-5 text-[#FDE68A] group-hover:text-[#E07A00] transition-colors" />
                </div>
                <h3 className="text-[17px] font-black text-black leading-tight">{t.title}</h3>
                <p className="text-[13px] text-[#6B7280] mt-1.5 line-clamp-1 font-medium">{t.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderChat = () => (
    <div className="flex flex-col min-h-0 h-full">
      <div ref={chatScrollRef} className="flex-1 min-h-0 overflow-y-auto px-6 pt-4 pb-3 space-y-5 no-scrollbar">
        {messages.length === 0 && (
          <div className="space-y-5 py-1">
            <div className="bg-[#FFFBEB] border-2 border-[#FEF3C7] rounded-[28px] p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <MessageSquare className="w-24 h-24 text-[#E07A00]" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#E07A00] p-3 rounded-2xl shadow-lg">
                    <Sparkles className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-[22px] font-black text-black">雷猴啊！朋友们</h3>
                </div>
                <p className="text-[16px] text-[#4B5563] leading-relaxed font-medium">
                  我是你的龙虾管家 <span className="text-[#E07A00] font-black">虾助手</span>。有什么不懂的尽管问，小白也能轻松玩转！
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {[
                '龙虾是什么？',
                '小白先学什么？',
                '龙虾能做什么？',
                '我这个问题怎么解决？'
              ].map(q => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="text-left p-5 bg-white border-2 border-[#F3F4F6] rounded-2xl text-[15px] font-black text-black hover:border-[#F59E0B] hover:bg-[#FFFBEB] transition-all flex justify-between items-center group shadow-sm"
                >
                  {q}
                  <ChevronRight className="w-5 h-5 text-[#FDE68A] group-hover:text-[#E07A00]" />
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex flex-col max-w-[90%]",
            m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
          )}>
            <div className={cn(
              "p-5 rounded-[24px] text-[15px] leading-relaxed shadow-sm border-2",
              m.role === 'user' 
                ? "bg-[#E07A00] text-white border-[#E07A00] rounded-tr-none font-bold" 
                : "bg-white border-[#F3F4F6] text-black rounded-tl-none"
            )}>
              {m.role === 'model' ? (
                <div className="markdown-body prose prose-sm max-w-none">
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              ) : m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-[#E07A00] text-[12px] font-black uppercase tracking-widest ml-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            管家正在思考中...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="shrink-0 p-3 bg-white/80 backdrop-blur-md border-t border-[#FDE68A] sticky bottom-0">
        <div className="flex items-center gap-3 bg-[#FFFBEB] border-2 border-[#FEF3C7] rounded-[20px] px-5 py-2 focus-within:border-[#F59E0B] transition-all shadow-inner">
          <input 
            ref={chatInputRef}
            type="text"
            placeholder="输入你的问题..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] py-2 font-bold text-black placeholder-[#B45309]/40"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-gradient-to-br from-[#F59E0B] to-[#E07A00] text-white rounded-xl disabled:opacity-30 transition-all active:scale-90 shadow-lg shadow-orange-500/30"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderDiary = () => {
    const filtered = diaries.filter(d => 
      (activeCategory === '全部' || d.category === activeCategory)
    );

    return (
      <div className="p-6 space-y-6 pb-24">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['全部', '实战', '踩坑', '成长'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-xl text-[14px] font-black whitespace-nowrap transition-all border-2",
                activeCategory === cat 
                  ? "bg-[#E07A00] text-white border-[#E07A00] shadow-lg shadow-orange-500/20" 
                  : "bg-white text-[#4B5563] border-[#F3F4F6] hover:border-[#FEF3C7]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-6">
          {filtered.map(d => (
            <motion.div 
              key={d.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => { setSelectedDiary(d); setSelectedTutorial(null); setView('detail'); }}
              className="bg-[#FFFBEB] border-2 border-[#FEF3C7] rounded-[32px] overflow-hidden hover:border-[#F59E0B] transition-all cursor-pointer shadow-sm group"
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={cn(
                    "text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest",
                    d.category === '实战' && "bg-[#E07A00] text-white",
                    d.category === '踩坑' && "bg-black text-white",
                    d.category === '成长' && "bg-[#F59E0B] text-white"
                  )}>
                    {d.category}
                  </span>
                  {d.tags.map(tag => (
                    <span key={tag} className="text-[12px] text-[#B45309] font-bold">#{tag}</span>
                  ))}
                </div>
                <h3 className="text-[22px] font-black text-black mb-3 leading-tight group-hover:text-[#E07A00] transition-colors">{d.title}</h3>
                <p className="text-[15px] text-[#4B5563] line-clamp-2 leading-relaxed font-medium">{d.description}</p>
                <div className="mt-6 flex items-center text-[#E07A00] text-[14px] font-black">
                  立即阅读实战日记 <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderDetail = () => {
    const item = selectedTutorial || selectedDiary;
    return (
      <div className="px-4 pt-5 pb-28">
        <article className="bg-[#FFFDF5] border-2 border-[#FEF3C7] rounded-[30px] px-6 py-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
          <div className="markdown-body max-w-none">
            <ReactMarkdown>{item?.content || ''}</ReactMarkdown>
          </div>
        </article>

        {/* Action Buttons */}
        <div className="mt-10 space-y-6 text-center">
          <div className="flex justify-center">
            <div className="h-1 w-12 bg-[#FDE68A] rounded-full" />
          </div>
          <p className="text-[13px] text-[#B45309] font-black uppercase tracking-widest">—— 遇到问题？找管家 ——</p>
          <button 
            onClick={() => { setActiveTab('chat'); setView('list'); }}
            className="w-full bg-gradient-to-r from-[#F59E0B] to-[#E07A00] text-white py-5 rounded-[20px] font-black text-[18px] shadow-xl shadow-orange-500/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
          >
            <MessageSquare className="w-6 h-6" />
            去虾聊天问 AI
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[100dvh] font-sans text-black w-full max-w-md mx-auto relative flex flex-col bg-white/50 backdrop-blur-sm md:border-x md:border-[#F0F0F0] md:shadow-2xl overflow-hidden">
      {renderHeader()}

      <main className="flex-1 min-h-0 overflow-y-auto no-scrollbar scroll-smooth">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${view}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {view === 'detail' ? renderDetail() : (
              <>
                {activeTab === 'tutorials' && renderTutorials()}
                {activeTab === 'chat' && renderChat()}
                {activeTab === 'diary' && renderDiary()}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Bar - Always visible in list view */}
      {view === 'list' && (
        <nav className="shrink-0 mx-4 mb-4 mt-2 bg-white/96 backdrop-blur-xl border border-[#E5E7EB] rounded-[22px] px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-3 items-center gap-2">
          {[
            { id: 'tutorials', icon: BookText, label: '虾百科' },
            { id: 'chat', icon: MessageSquare, label: '虾聊天' },
            { id: 'diary', icon: BookOpen, label: '虾日记' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as Tab); setView('list'); setActiveCategory('全部'); }}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all relative w-full min-h-[58px] rounded-[16px] px-2",
                activeTab === item.id ? "text-[#E07A00] bg-[#FFF7ED]" : "text-[#6B7280]"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform", activeTab === item.id && "scale-110")} />
              <span className="text-[11px] font-black leading-none whitespace-nowrap">{item.label}</span>
              {activeTab === item.id && (
                <motion.div 
                  layoutId="nav-dot"
                  className="absolute -bottom-0.5 w-1.5 h-1.5 bg-[#E07A00] rounded-full shadow-[0_0_10px_rgba(224,122,0,0.5)]"
                />
              )}
            </button>
          ))}
          </div>
        </nav>
      )}
    </div>
  );
}
