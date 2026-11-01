import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  HelpCircle, 
  ChevronDown, 
  Maximize2, 
  Minimize2,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { ChatMessage } from '../types/event';
import { askEventEaseAssistant, isGeminiConfigured } from '../services/gemini';
import { useEvents } from '../context/EventContext';

export const AIAssistantChat: React.FC = () => {
  const { activeEvent } = useEvents();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your **EventEase Assistant**. ✨\n\nI can help you calculate budgets, suggest unique themes, write guest menus, negotiate with vendors, and optimize timelines. What can I help you plan today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "How can I plan a wedding within ₹3 lakh?",
    "Suggest a unique birthday theme.",
    "How can I reduce decoration costs?",
    "What vendors do I need for a community event?",
    "Give me a vegetarian food menu for 100 guests."
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const { reply } = await askEventEaseAssistant(
        userMsg.content,
        activeEvent ? activeEvent.input : null,
        messages
      );

      const aiMsg: ChatMessage = {
        id: 'reply-' + Date.now(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          content: "I'm having a brief connection pause. Please try asking again!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple Markdown renderer for chat responses
  const renderFormattedText = (text: string) => {
    // Basic formatting for headers, bold, bullet points
    return text.split('\n').map((line, idx) => {
      let content = line;
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="font-bold text-navy-950 text-sm mt-2 mb-1">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="font-bold text-navy-950 text-base mt-2 mb-1">{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const itemText = line.substring(2);
        return (
          <li key={idx} className="ml-4 list-disc text-xs leading-relaxed text-navy-800 my-0.5">
            {formatBold(itemText)}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={idx} className="ml-4 list-decimal text-xs leading-relaxed text-navy-800 my-0.5">
            {formatBold(line.replace(/^\d+\.\s/, ''))}
          </li>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      return <p key={idx} className="text-xs leading-relaxed text-navy-800">{formatBold(content)}</p>;
    });
  };

  const formatBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-navy-950">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 px-4 py-3.5 rounded-full bg-gradient-to-r from-navy-900 via-navy-800 to-lavender-800 text-white shadow-soft-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          aria-label="Open EventEase Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-rose-300 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-400 rounded-full animate-ping"></span>
          </div>
          <span className="font-medium text-xs tracking-wide">EventEase Assistant</span>
          <span className="px-2 py-0.5 text-[10px] font-bold bg-white/20 rounded-full">AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-4 sm:right-6 z-40 bg-white rounded-3xl shadow-soft-xl border border-lavender-200 flex flex-col overflow-hidden transition-all duration-300 ${
            isExpanded
              ? 'w-[92vw] sm:w-[540px] h-[85vh] max-h-[750px]'
              : 'w-[92vw] sm:w-[420px] h-[580px] max-h-[80vh]'
          }`}
        >
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-navy-900 via-lavender-900 to-navy-900 text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-rose-300 border border-white/15">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-sm tracking-wide text-white">EventEase Assistant</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-ivory-200/70 truncate max-w-[220px]">
                  {activeEvent ? `Active: ${activeEvent.input.name}` : 'GenAI Event Companion'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-navy-200">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-ivory-200 hover:text-white transition-colors"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-ivory-200 hover:text-white transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Context Banner */}
          {activeEvent && (
            <div className="px-4 py-2 bg-lavender-50 border-b border-lavender-100 flex items-center justify-between text-[11px] text-navy-800 shrink-0">
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-lavender-600"></span>
                <span className="font-semibold capitalize truncate">{activeEvent.input.category}:</span>
                <span className="truncate">{activeEvent.input.name}</span>
                <span className="text-gray-500">| Budget: ₹{activeEvent.input.budget.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-ivory-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[88%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.role === 'user'
                      ? 'bg-lavender-700 text-white'
                      : 'bg-navy-900 text-rose-300'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`rounded-2xl p-3.5 text-xs shadow-soft-sm ${
                    msg.role === 'user'
                      ? 'bg-lavender-700 text-white rounded-tr-none'
                      : 'bg-white border border-lavender-100 text-navy-900 rounded-tl-none'
                  }`}
                >
                  <div className="space-y-1">
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      renderFormattedText(msg.content)
                    )}
                  </div>
                  <span
                    className={`block text-[9px] mt-1.5 ${
                      msg.role === 'user' ? 'text-lavender-200 text-right' : 'text-gray-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 mr-auto max-w-[80%] items-center">
                <div className="w-7 h-7 rounded-full bg-navy-900 text-rose-300 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-lavender-100 rounded-2xl rounded-tl-none p-3.5 shadow-soft-sm flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-lavender-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-lavender-600 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-lavender-800 animate-bounce [animation-delay:0.4s]"></div>
                  <span className="text-[11px] text-navy-500 ml-1.5 font-medium">EventEase AI thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts Pills */}
          <div className="px-3 py-2 bg-white border-t border-lavender-100 shrink-0">
            <div className="flex items-center gap-1 text-[10px] text-navy-400 mb-1 font-semibold uppercase tracking-wider">
              <Lightbulb className="w-3 h-3 text-amber-500" />
              <span>Suggested Questions</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-lavender-50 border border-lavender-200 text-[11px] text-navy-800 hover:bg-lavender-100 hover:text-lavender-900 transition-colors disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={activeEvent ? `Ask about ${activeEvent.input.name}...` : "Ask anything about event planning..."}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-navy-900 focus:outline-none focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 transition-all placeholder:text-gray-400"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !inputMessage.trim()}
                className="w-10 h-10 rounded-xl bg-navy-900 hover:bg-navy-800 disabled:bg-gray-200 text-white flex items-center justify-center transition-colors shadow-soft-sm shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

