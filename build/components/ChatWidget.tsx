import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage, ChatSender } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import Button from './ui/Button';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: ChatSender.BOT,
      text: "Hi! I'm your renovation assistant. Ask me about our euro-renovation standards, materials, or timelines.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Lock body scroll on mobile when chat is open
  useEffect(() => {
    if (window.innerWidth < 640 && isOpen) {
       document.body.style.overflow = 'hidden';
    } else {
       document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: ChatSender.USER,
      text: userText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.sender === ChatSender.USER ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToGemini(userText, history);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: ChatSender.BOT,
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 sm:bottom-6 sm:right-6 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className={`
          pointer-events-auto
          bg-white dark:bg-gray-800 shadow-2xl overflow-hidden flex flex-col
          transition-all animate-in slide-in-from-bottom-10 duration-300
          
          /* Mobile Styles: Full width bottom sheet */
          fixed bottom-0 left-0 right-0 h-[85vh] rounded-t-2xl border-t border-gray-200 dark:border-gray-700
          
          /* Desktop Styles: Floating Bubble */
          sm:static sm:h-[500px] sm:w-96 sm:rounded-2xl sm:border sm:mb-4
        `}>
          {/* Header */}
          <div className="bg-primary-900 dark:bg-primary-950 p-4 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-1.5 rounded-full">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">RenovateAI Assistant</h3>
                <p className="text-xs text-primary-200 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full block"></span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={toggleChat} className="text-white/80 hover:text-white transition-colors p-2 -mr-2">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === ChatSender.USER ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                  ${msg.sender === ChatSender.USER 
                    ? 'bg-primary-600 text-white rounded-br-none' 
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-primary-600 dark:text-primary-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex gap-2 shrink-0 pb-safe">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about prices, materials..."
              className="flex-1 bg-gray-100 dark:bg-gray-900 dark:text-white border-0 rounded-full px-4 py-3 text-base sm:text-sm focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-900 transition-all outline-none placeholder-gray-500 dark:placeholder-gray-400"
            />
            <Button type="submit" size="sm" disabled={isLoading || !inputValue.trim()} className="rounded-full w-12 h-12 sm:w-10 sm:h-10 p-0 flex items-center justify-center">
              <Send size={18} />
            </Button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <div className="pointer-events-auto p-4 sm:p-0">
        <button
          onClick={toggleChat}
          className={`
            h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95
            ${isOpen ? 'bg-gray-800 text-white rotate-90 dark:bg-white dark:text-gray-900 opacity-0 sm:opacity-100' : 'bg-primary-600 text-white hover:bg-primary-700'}
          `}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;