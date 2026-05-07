import React, { useState } from 'react';
import { X, MessageSquare, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hello! I'm your ElderCare Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an AI assistant for ElderCare Assist, a home healthcare platform. 
        Help the user with questions about home nursing, physiotherapy, or elderly care. 
        Keep responses helpful, compassionate, and brief.
        Current message: ${userMsg}`,
      });
      
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Service temporarily unavailable. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-80 md:w-96 h-[500px] mb-4 rounded-3xl shadow-2xl flex flex-col overflow-hidden border-4 border-primary-500"
          >
            <div className="bg-primary-500 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot />
                <span className="font-bold">Care Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary-50/30">
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "max-w-[80%] p-3 rounded-2xl",
                  m.role === 'user' ? "ml-auto bg-primary-500 text-white rounded-br-none" : "bg-white text-neutral-800 shadow-sm rounded-bl-none"
                )}>
                  <p className="text-sm">{m.text}</p>
                </div>
              ))}
              {isTyping && <div className="text-xs text-neutral-400 italic">Assistant is typing...</div>}
            </div>

            <div className="p-4 bg-white border-t border-neutral-100 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our services..."
                className="flex-1 bg-neutral-100 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                <MessageSquare size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-90 transition-all border-4 border-white"
      >
        <Bot size={32} />
      </button>
    </div>
  );
};
