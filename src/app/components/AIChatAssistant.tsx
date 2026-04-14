import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Calendar, Coffee, Utensils, Waves, Music, Bell, ShieldCheck, Clock, Ban } from 'lucide-react';
import { useBookingFlow } from '../hooks/useBookingFlow';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  action?: {
    label: string;
    payload: any;
  };
}

const INITIAL_MESSAGE: Message = {
  id: '1',
  type: 'bot',
  text: "Welcome to Khurpatal Lake Inn. I am your personal concierge. May I know your name so I can assist you better?",
};

const SUGGESTIONS = [
  { id: '1', text: "Check-in & Out times?", icon: <Clock size={14} /> },
  { id: '2', text: "Are pets allowed?", icon: <Ban size={14} /> },
  { id: '3', text: "Suggest a 2-day stay", icon: <Calendar size={14} /> },
  { id: '4', text: "Room for 4 people?", icon: <Sparkles size={14} /> },
];

const KNOWLEDGE_BASE = [
  {
    keywords: ['check', 'time', 'in', 'out'],
    response: "Our standard check-in time is **01:30 PM** and check-out is **11:00 AM**. Early check-in or late check-out can be requested at the desk, subject to availability."
  },
  {
    keywords: ['pet', 'dog', 'cat', 'animal'],
    response: "To maintain our serenity and standard of luxury, **pets are not allowed** at Khurpatal Lake Inn, except for certified service animals."
  },
  {
    keywords: ['cancel', 'refund', 'policy'],
    response: "Our cancellation policy is tier-based:\n- 29+ days: Nil charges\n- 28-20 days: 25% charge\n- 19-8 days: 50% charge\n- < 7 days: 100% charge\nWould you like to see the full document?"
  },
  {
    keywords: ['food', 'eat', 'dinner', 'breakfast', 'restaurant', 'kitchen'],
    response: "**The Emerald Kitchen** serves authentic Kumaoni cuisine alongside global favorites. We pride ourselves on using local, mountain-fresh ingredients."
  },
  {
    keywords: ['pool', 'swim'],
    response: "Our **Infinity Pool** is open from **08:00 AM to 08:00 PM**. Please ensure you use appropriate swimwear. It offers the most stunning view of the lake!"
  },
  {
    keywords: ['price', 'cost', 'expensive', 'cheap', 'rate'],
    response: "Our rates vary by season and room type, starting from roughly ₹4,500/night for Dorms to ₹12,000+ for Luxury Suites. I can check live availability for your dates!"
  },
  {
    keywords: ['reach', 'location', 'distance', 'airport', 'train', 'how to'],
    response: "We are 12km from Nainital. The nearest station is Kathgodam (36km) and Pantnagar Airport (70km). We can arrange private luxury transfers for you!"
  },
  {
    keywords: ['wifi', 'internet', 'network'],
    response: "Enjoy complimentary **High-Speed WiFi** throughout the property. Perfect for both remote work and streaming your favorite mountain playlists."
  },
  {
    keywords: ['parking', 'car', 'vehicle'],
    response: "We provide **Complimentary Secure Parking** for all our guests. Valet services are also available upon arrival."
  }
];

interface AIChatAssistantProps {
  flow: ReturnType<typeof useBookingFlow>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function AIChatAssistant({ flow, isOpen, setIsOpen }: AIChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [guestName, setGuestName] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openFlow } = flow;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const findBestResponse = (text: string): Message => {
    const input = text.toLowerCase();
    const id = Date.now().toString();

    // 1. Check for interactive booking intent (Numbers + Stay/People/Room)
    const guestMatch = input.match(/(\d+)\s*(people|person|guest|adult|children|kid)/);
    if (guestMatch) {
      const guests = parseInt(guestMatch[1]);
      return {
        id,
        type: 'bot',
        text: `I see you are planning for **${guests} guests**. For a group of this size, I recommend our ${guests > 2 ? 'Interconnected Luxury Suites' : 'Sanctuary of Serenity Suite'}.\n\nWould you like to check availability now?`,
        action: {
          label: `Book for ${guests} Guests`,
          payload: { guests, roomType: guests > 2 ? 'Luxury' : 'All' }
        }
      };
    }

    // 2. Check Knowledge Base
    for (const entry of KNOWLEDGE_BASE) {
      if (entry.keywords.some(k => input.includes(k))) {
        return {
          id,
          type: 'bot',
          text: entry.response,
        };
      }
    }

    // 3. Fallback / Default
    return {
      id,
      type: 'bot',
      text: "That's an interesting inquiry! As your concierge, I'd say Khurpatal offers the perfect backdrop for that. Would you like to check our room availability or learn more about our local experiences?",
      action: {
        label: "Check Availability",
        payload: { guests: 2 }
      }
    };
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = '';
      let action = undefined;

      if (!guestName) {
        // Assume first response is the name
        setGuestName(text);
        responseText = `It's a pleasure to meet you, **${text}**. I am now at your service. How may I help you with your stay today?`;
      } else {
        const result = findBestResponse(text);
        const prefixes = [
          `Certainly **${guestName}**,`,
          `Of course **${guestName}**,`,
          `Great question **${guestName}**!`,
          `As your concierge **${guestName}**,`,
          `I can help with that **${guestName}**!`
        ];
        const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        responseText = `${randomPrefix} ${result.text}`;
        action = result.action;
      }

      const response: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text: responseText,
        action
      };

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1200);
  };

  const handleAction = (payload: any) => {
    setIsOpen(false);
    openFlow(payload, 'dates');
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[100]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-[#434021] text-white p-5 rounded-3xl flex items-center gap-3 overflow-hidden group hover:bg-black transition-all"
        >
          <Sparkles className="group-hover:rotate-12 transition-transform" />
          <span className="font-bold text-xs uppercase tracking-[0.2em] hidden md:block">Plan Your Stay</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-28 right-8 w-[90vw] md:w-[420px] h-[640px] bg-[#FBF6EE]/95 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] shadow-2xl z-[101] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-[#434021] text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center text-black shadow-lg">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-bold tracking-tight">Khurpatal Concierge</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-white/50">Online to Serve</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-[1.5rem] ${
                    msg.type === 'user' 
                      ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/10' 
                      : 'bg-white text-slate-700 shadow-sm border border-slate-100'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                        {msg.text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="font-black text-slate-900">{part}</strong> : part)}
                    </p>
                    
                    {msg.action && (
                      <button
                        onClick={() => handleAction(msg.action?.payload)}
                        className="mt-5 w-full bg-[#434021] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-[#434021]/10 flex items-center justify-center gap-2"
                      >
                        <Calendar size={14} />
                        {msg.action.label}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-slate-100 flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce [animation-delay:-0.32s]" />
                    <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce [animation-delay:-0.16s]" />
                    <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions Slider */}
            <div className="px-6 pb-4 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
              {SUGGESTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleSend(s.text)}
                  className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-full text-[10px] font-bold text-slate-500 hover:border-amber-500 hover:text-amber-600 transition-all shrink-0 shadow-sm"
                >
                  <span className="text-amber-500">{s.icon}</span>
                  {s.text}
                </button>
              ))}
            </div>

            {/* Footer Input */}
            <div className="p-6 bg-white border-t border-slate-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ask about check-in, pool, or book a room..."
                  className="w-full bg-slate-50 rounded-2xl pl-5 pr-14 py-5 text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all text-slate-900"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                />
                <button 
                  onClick={() => handleSend(inputValue)}
                  className="absolute right-2 p-3 bg-[#434021] text-white rounded-xl hover:bg-black transition-all shadow-lg"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
