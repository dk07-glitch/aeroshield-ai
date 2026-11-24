import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  ShieldCheck, 
  FileText, 
  Zap, 
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { PRESET_AI_PROMPTS } from '../data/mockData';
import { generateSmogAdvice } from '../services/aiAssistantService';

export default function GenAICopilot({ city, persona }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I am **Aura**, your GenAI Clean Air & Winter Smog Copilot. I'm actively monitoring atmospheric inversion profiles for **${city.name}** (AQI: ${city.aqi}) tailored for **${persona.title}**.\n\nAsk me anything from low-emission daily routines and DIY Corsi-Rosenthal purifiers, to ventilation timing and pediatric/elderly respiratory protection.`,
      structured: null,
      timestamp: 'Just now'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || isLoading) return;

    const userMsgId = 'user-' + Date.now();
    const newUserMsg = {
      id: userMsgId,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const aiResponse = await generateSmogAdvice({
        prompt,
        city,
        persona,
        currentAqi: city.aqi
      });

      const aiMsgId = 'ai-' + Date.now();
      const newAiMsg = {
        id: aiMsgId,
        sender: 'ai',
        text: aiResponse.summary,
        structured: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, newAiMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: 'ai-err-' + Date.now(),
          sender: 'ai',
          text: 'I encountered an issue synthesizing the atmospheric modeling data. Please try rephrasing your query.',
          structured: null,
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#0f172a]/95 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[740px]">
      
      {/* Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 border border-cyan-400/30">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base font-['Outfit']">Aura Clean Air Copilot</h3>
              <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded-full font-semibold">
                Atmospheric Intelligence
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Personalized for: <span className="text-slate-200 font-medium">{persona.title}</span> in <span className="text-cyan-300 font-medium">{city.name}</span>
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Evidence-Based: WHO & Lancet Guidelines</span>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2.5 bg-slate-900/70 border-b border-slate-800/80 overflow-x-auto scrollbar-none flex gap-2">
        {PRESET_AI_PROMPTS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(item.prompt)}
            disabled={isLoading}
            className="text-xs whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700 transition flex items-center gap-1.5 shrink-0"
          >
            <span>{item.title}</span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-4xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className={`rounded-2xl p-4 text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md w-full'
            }`}>
              
              {/* Message Header */}
              <div className="flex items-center justify-between text-[11px] mb-2 opacity-75">
                <span className="font-semibold">{msg.sender === 'user' ? 'You' : 'Aura AI Copilot'}</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Text content */}
              <div className="space-y-3 whitespace-pre-line">
                {msg.text}
              </div>

              {/* Structured Section Presentation if available */}
              {msg.structured && (
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4">
                  {/* Title */}
                  <div className="text-base font-bold text-cyan-300 font-['Outfit']">
                    {msg.structured.title}
                  </div>

                  {/* Impact Quick Cards */}
                  {msg.structured.impactStats && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1">
                      {Object.entries(msg.structured.impactStats).map(([key, val], idx) => (
                        <div key={idx} className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                          <div className="text-[10px] uppercase font-semibold text-slate-400">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </div>
                          <div className="text-sm font-extrabold text-cyan-400 mt-0.5">
                            {val}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Detail Sections */}
                  {msg.structured.sections.map((sec, idx) => (
                    <div key={idx} className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/70">
                      <h4 className="font-semibold text-slate-100 text-sm mb-1.5 flex items-center gap-1.5">
                        {sec.heading}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                        {sec.content}
                      </p>
                    </div>
                  ))}

                  {/* Scientific Sources & Copy Button */}
                  <div className="flex flex-wrap items-center justify-between pt-2 text-[11px] text-slate-400 gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-slate-300">Evidence Citations:</span>
                      <span>{msg.structured.sources.join(' • ')}</span>
                    </div>

                    <button
                      onClick={() => handleCopy(msg.id, JSON.stringify(msg.structured, null, 2))}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy Protocol'}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-lg">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span>Aura is modeling atmospheric boundary parameters & synthesizing guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={`Ask Aura about low-emission routines, DIY purifiers, or smog safety in ${city.name}...`}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white rounded-2xl transition shadow-lg shadow-cyan-500/20 flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
