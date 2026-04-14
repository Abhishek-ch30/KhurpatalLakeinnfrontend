import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, MessageSquare } from 'lucide-react';

export function FAQSection({ onContactConcierge }: { onContactConcierge?: () => void }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

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
    <section id="faq" className="py-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-[#FBF6EE] text-[#434021] rounded-3xl flex items-center justify-center mx-auto mb-6"
          >
             <HelpCircle size={32} />
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block"
          >
            Inquiries
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#434021] tracking-tight leading-none mb-6" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Essential
            <br />
            Clarifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500 font-medium"
          >
            Everything you need to know for your pristine Himalayan journey.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-[2rem] overflow-hidden transition-all duration-500 ${
                activeIndex === index 
                  ? 'border-[#434021] bg-white shadow-xl shadow-[#434021]/5' 
                  : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-8 text-left"
              >
                <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                  activeIndex === index ? 'text-[#434021]' : 'text-slate-600'
                }`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeIndex === index ? 'bg-[#434021] text-white rotate-180' : 'bg-white text-slate-400 border border-slate-100'
                }`}>
                  {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-8 pb-8 pt-0">
                      <div className="h-px bg-slate-100 mb-6" />
                      <p className="text-slate-500 font-medium leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 bg-[#434021] rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-2xl"
        >
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-amber-500">
                <MessageSquare size={32} />
             </div>
             <div>
                <h4 className="text-xl font-bold tracking-tight">Still have questions?</h4>
                <p className="text-white/60 text-sm font-medium">Our concierge is here to help you plan everything.</p>
             </div>
          </div>
          <button 
            onClick={onContactConcierge}
            className="px-8 py-4 bg-amber-500 text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-amber-500/20"
          >
             Contact Concierge
          </button>
        </motion.div>
      </div>
    </section>
  );
}
