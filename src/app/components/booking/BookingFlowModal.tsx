import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, Loader2 } from 'lucide-react';
import { BookingStep, useBookingFlow } from '../../hooks/useBookingFlow';
import { DateSelector } from './DateSelector';
import { RoomSelector } from './RoomSelector';
import { AuthStep } from './AuthStep';
import { GuestDetails } from './GuestDetails';
import { Confirmation } from './Confirmation';

interface BookingFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  flow: ReturnType<typeof useBookingFlow>;
}

export const BookingFlowModal: React.FC<BookingFlowModalProps> = ({ isOpen, onClose, flow }) => {
  const { step, prevStep, isLoading } = flow;

  if (!isOpen) return null;

  const renderStep = () => {
    switch (step) {
      case 'dates': return <DateSelector flow={flow} />;
      case 'rooms': return <RoomSelector flow={flow} />;
      case 'auth': return <AuthStep flow={flow} />;
      case 'details': return <GuestDetails flow={flow} />;
      case 'confirm': return <Confirmation flow={flow} />;
      case 'success': return <Confirmation flow={flow} />; // Handled inside confirmation
      default: return null;
    }
  };

  const showBackButton = step !== 'dates' && step !== 'success';
  const progressPercent = step === 'dates' ? 20 : step === 'rooms' ? 40 : step === 'auth' ? 60 : step === 'details' ? 80 : 100;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6 backdrop-blur-2xl bg-[#434021]/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] bg-white/90 md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-white/20"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 z-50">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progressPercent}%` }}
               className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-500"
            />
          </div>

          {/* Header Controls */}
          <div className="flex items-center justify-between p-6 md:p-8 z-50">
            {showBackButton ? (
              <button 
                onClick={prevStep}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all group"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Previous</span>
              </button>
            ) : <div className="w-10" />}

            <div className="text-center">
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-1">Stay at Khurpatal</p>
                <h4 className="text-sm font-bold text-[#434021] opacity-40 uppercase tracking-widest">
                    {step === 'dates' && 'Dates & Guests'}
                    {step === 'rooms' && 'Select Sanctuary'}
                    {step === 'auth' && 'Authentication'}
                    {step === 'details' && 'Guest Particulars'}
                    {step === 'confirm' && 'Final Review'}
                    {step === 'success' && 'Confirmed'}
                </h4>
            </div>

            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 md:px-12 md:pb-12 custom-scrollbar relative">
             {isLoading && (
                 <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-40 flex items-center justify-center">
                    <Loader2 className="animate-spin text-amber-500" size={48} />
                 </div>
             )}
             
             <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderStep()}
                </motion.div>
             </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
