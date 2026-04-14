import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ShieldCheck, Clock, CreditCard, Ban, Trash2, HelpCircle, Bell, Info } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const policies = [
  {
    id: 'check-in-out',
    title: 'Check-In & Check-Out',
    icon: <Clock size={20} />,
    items: [
      'Check-in time: 01:30 PM',
      'Check-out time: 11:00 AM',
      'Contact hotel desk for early check-in or late check-out availability and charges.'
    ]
  },
  {
    id: 'child',
    title: 'Child Policy',
    icon: <Bell size={20} />,
    items: [
      'Children up to 5 years stay free of charge when using existing bedding.',
      'Extra bed charges apply for children aged 5-12 years.'
    ]
  },
  {
    id: 'payment',
    title: 'Payment Policy',
    icon: <CreditCard size={20} />,
    items: [
      'Reservations must be guaranteed with advance payment.',
      'Remaining balance typically due upon check-in.',
      'Accepted methods: Cash, UPI, Debit Cards, Credit Cards.',
      'Please confirm available payment options at the time of booking.'
    ]
  },
  {
    id: 'cancellation',
    title: 'Cancellation & Refunds',
    icon: <Trash2 size={20} />,
    content: `
Till 29 days before cancellation: Nil
28 to 20 days before check-in: 25% charge
19 to 8 days before check-in: 50% charge
7 days before check-in: 100% charge
Group bookings: No refunds for unused package nights.
    `
  },
  {
    id: 'smoking-pets',
    title: 'Smoking & Pets',
    icon: <Ban size={20} />,
    items: [
      'Smoking prohibited in all indoor areas including rooms.',
      'Designated smoking areas available outside; kindly use balcony spaces.',
      'Pets are not allowed, except for service animals as required by law.'
    ]
  },
  {
    id: 'noise-disturbance',
    title: 'Noise & Disturbance',
    icon: <Bell size={20} />,
    items: [
      'Quiet hours: 10:00 PM to 07:00 AM.',
      'Loud music in common areas or rooms after 10:00 PM is strictly prohibited.',
      'Respect local village norms and government regulations.'
    ]
  },
  {
    id: 'damage-safety',
    title: 'Damage, Safety & Security',
    icon: <ShieldCheck size={20} />,
    items: [
      'Guests are financially responsible for any damage to hotel property.',
      'Missing items from rooms may result in charges.',
      'In-room safes for valuables available on demand.',
      'Emergency procedures and exits are clearly marked.'
    ]
  },
  {
    id: 'amenities-rules',
    title: 'Facility Rules',
    icon: <Info size={20} />,
    subsections: [
      {
        subtitle: 'Swimming Pool',
        items: [
          'Hours: 08:00 AM to 08:00 PM.',
          'Appropriate swimwear required (no jeans/cotton).',
          'Children under 14 must be accompanied by an adult.',
          'No lifeguard on duty; swim at your own risk.',
          'No food, drinks, or smoking in pool area.'
        ]
      },
      {
        subtitle: 'Gymnasium',
        items: [
          'Hours: 06:00 AM to 10:00 PM.',
          'Closed-toe athletic shoes required.',
          'Wipe down equipment after use.',
          'External trainers not permitted.'
        ]
      },
      {
        subtitle: 'Dormitory',
        items: [
          'Lights out @ 11:00 PM.',
          'Alcohol and smoking strictly prohibited.',
          'No outside visitors allowed in rooms.',
          'Store belongings in assigned lockers.'
        ]
      }
    ]
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    icon: <Trash2 size={20} />,
    items: [
      'Single-use plastic reduction (glass bottles, refillable dispensers).',
      'Lake conservation: Ban on commercial activities on Khurpatal Lake.',
      'Seasonal bonfires (December & January only) to reduce wood consumption.',
      'Towel and linen reuse program encouraged.'
    ]
  }
];

export function PolicyModal({ isOpen, onClose }: PolicyModalProps) {
  const [selectedId, setSelectedId] = React.useState(policies[0].id);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] lg:flex items-center justify-center p-4 lg:p-12"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 inset-y-8 lg:inset-24 bg-[#FBF6EE] z-[1001] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Header Mobile */}
            <div className="lg:hidden p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#434021]">Hotel Policies</h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <div className="w-full lg:w-80 bg-slate-50 border-r border-slate-200 flex flex-col">
              <div className="hidden lg:block p-8">
                <h2 className="text-2xl font-bold text-[#434021] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Hotel Policies</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Khurpatal Lake Inn</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-2">
                {policies.map((policy) => (
                  <button
                    key={policy.id}
                    onClick={() => setSelectedId(policy.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                      selectedId === policy.id 
                        ? 'bg-[#434021] text-white shadow-lg shadow-[#434021]/20' 
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <span className={selectedId === policy.id ? 'text-amber-500' : ''}>
                      {policy.icon}
                    </span>
                    <span className="text-sm font-bold">{policy.title}</span>
                    <ChevronRight size={14} className={`ml-auto transition-transform ${selectedId === policy.id ? 'translate-x-1' : ''}`} />
                  </button>
                ))}
              </div>
              <div className="p-6 border-t border-slate-200 hidden lg:block">
                 <button onClick={onClose} className="w-full py-4 bg-white border-2 border-slate-200 rounded-2xl text-sm font-black uppercase tracking-widest hover:border-[#434021] transition-colors">
                    Close Document
                 </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-white p-6 lg:p-12 relative">
               <button onClick={onClose} className="hidden lg:block absolute top-12 right-12 p-2 hover:bg-slate-100 rounded-full transition-colors">
                 <X size={32} />
               </button>

               <div className="max-w-2xl mx-auto">
                  {policies.map((policy) => (
                    <div key={policy.id} className={selectedId === policy.id ? 'block animate-in fade-in slide-in-from-bottom-4 duration-500' : 'hidden'}>
                       <div className="flex items-center gap-4 mb-8">
                          <div className="w-16 h-16 bg-[#FBF6EE] text-[#434021] rounded-3xl flex items-center justify-center">
                             {React.cloneElement(policy.icon as React.ReactElement, { size: 32 })}
                          </div>
                          <h3 className="text-3xl font-bold text-[#434021] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>{policy.title}</h3>
                       </div>

                       <div className="space-y-6">
                          {policy.items && (
                            <ul className="space-y-4">
                               {policy.items.map((item, i) => (
                                 <li key={i} className="flex gap-4 text-slate-600 leading-relaxed font-medium capitalize">
                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                    {item}
                                 </li>
                               ))}
                            </ul>
                          )}

                          {policy.content && (
                            <pre className="whitespace-pre-line text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100 text-sm">
                               {policy.content}
                            </pre>
                          )}

                          {policy.subsections && policy.subsections.map((sub, i) => (
                            <div key={i} className="mb-10 last:mb-0">
                               <h4 className="text-lg font-bold text-[#434021] mb-4 flex items-center gap-2">
                                  <div className="w-1 h-4 bg-amber-500 rounded-full" />
                                  {sub.subtitle}
                               </h4>
                               <ul className="space-y-3">
                                  {sub.items.map((item, j) => (
                                    <li key={j} className="flex gap-4 text-slate-600 leading-relaxed font-medium text-sm">
                                       <div className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                                       {item}
                                    </li>
                                  ))}
                               </ul>
                            </div>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
