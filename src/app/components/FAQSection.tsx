import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, MessageSquare, ChevronDown, ArrowUpRight } from 'lucide-react';

export function FAQSection({ onContactConcierge }: { onContactConcierge?: () => void }) {
  // Fixed: Set initial state to null so first FAQ is closed by default
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are the standard Check-in and Check-out timings?",
      answer: "Our check-in time is 01:30 PM and check-out time is 11:00 AM. For those wishing to extend their stay or arrive early, please contact our concierge to discuss availability and potential additional charges."
    },
    {
      question: "Is there secure parking available on the property?",
      answer: "Yes, we provide complimentary secure on-site parking for all our staying guests. If you are arriving with a group or larger vehicles, kindly inform us in advance so we can ensure seamless spacing."
    },
    {
      question: "What is your high-speed WiFi coverage like?",
      answer: "We offer high-speed fiber-optic WiFi across the entire property, including all guest rooms and common areas, ensuring you stay connected even in the heart of the mountains."
    },
    {
      question: "What is the cancellation policy for reservations?",
      answer: "Our standard policy offers nil cancellation charges up to 29 days before arrival. Charges apply closer to the check-in date (25% for 20-28 days, 50% for 8-19 days, and 100% within 7 days). Complete details are provided during the booking process."
    },
    {
      question: "Are pets allowed at Khurpatal Lake Inn?",
      answer: "To ensure the comfort and safety of all our guests, pets are generally not allowed, with the exception of service animals as required by law. Please contact us for further clarifications."
    },
    {
      question: "Do you offer dining services outside of breakfast?",
      answer: "Absolutely. 'The Emerald Kitchen' serves an extensive multi-cuisine menu including Kumaoni Fusion and Continental classics from 07:00 AM until 10:30 PM daily."
    }
  ];

  return (
    <section id="faq" className="py-40 bg-white relative overflow-hidden">
      {/* Editorial Accents */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[1000px] h-[1000px] bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Centered Editorial Header */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#434021]/10 rounded-full mb-6"
          >
             <div className="w-1 h-1 bg-[#434021] rounded-full animate-pulse" />
             <span className="text-[#434021]/70 tracking-[0.5em] text-[10px] font-black uppercase">Inquiries</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[2.75rem] sm:text-6xl lg:text-8xl text-[#434021] leading-[1] tracking-tighter mb-8" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Essential <br />
            <span className="italic text-amber-600">Clarifications</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto border-t border-amber-500/10 pt-8"
          >
            Everything you need to know for your pristine Himalayan journey.
          </motion.p>
        </div>

        {/* The Inscription Stack - Minimalist Editorial Accordion */}
        <div className="space-y-0 relative">
           <div className="absolute top-0 left-0 w-full h-px bg-amber-500/10" />
           
           {faqs.map((faq, index) => (
             <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group border-b border-amber-500/10"
             >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full py-10 flex items-center justify-between text-left group"
                >
                   <div className="flex items-start gap-6 md:gap-10">
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-600/40 mt-1 md:mt-2">
                         0{index + 1}
                      </span>
                      <span className={`text-xl md:text-3xl font-bold tracking-tight transition-all duration-500 ${
                        activeIndex === index ? 'text-[#434021] translate-x-2 md:translate-x-4' : 'text-[#434021]/60 hover:text-[#434021]'
                      }`} style={{ fontFamily: 'var(--font-heading)' }}>
                        {faq.question}
                      </span>
                   </div>
                   
                   <motion.div 
                     animate={{ rotate: activeIndex === index ? 45 : 0 }}
                     className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        activeIndex === index ? 'bg-amber-600 text-white shadow-xl' : 'bg-amber-500/5 text-amber-600 group-hover:bg-amber-500 group-hover:text-white'
                     }`}
                   >
                      <Plus size={24} strokeWidth={1.5} />
                   </motion.div>
                </button>

                <AnimatePresence>
                   {activeIndex === index && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                       className="overflow-hidden"
                     >
                       <div className="pl-12 md:pl-20 pr-6 md:pr-12 pb-8 md:pb-12">
                          <p className="text-base md:text-xl text-slate-500 font-medium leading-[1.6] max-w-2xl">
                             {faq.answer}
                          </p>
                       </div>
                     </motion.div>
                   )}
                </AnimatePresence>
             </motion.div>
           ))}
        </div>

        {/* Global Concierge Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-[#434021] rounded-[4rem] relative overflow-hidden shadow-2xl group"
        >
           {/* Abstract Decoration */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-bl-[10rem] transition-transform duration-1000 group-hover:scale-110" />
           
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-8">
                 <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-amber-500">
                    <MessageSquare size={36} />
                 </div>
                 <div>
                    <h4 className="text-3xl font-bold text-white tracking-tight mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Still have questions?</h4>
                    <p className="text-white/50 text-base font-medium">Our curator concierge is available for bespoke journey planning.</p>
                 </div>
              </div>
              
              <button 
                onClick={onContactConcierge}
                className="px-12 py-5 bg-amber-500 text-[#434021] rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-white transition-all shadow-xl shadow-amber-500/20 active:scale-95"
              >
                 Contact Concierge
                 <ArrowUpRight size={14} className="opacity-40" />
              </button>
           </div>
        </motion.div>
        
      </div>
    </section>
  );
}
