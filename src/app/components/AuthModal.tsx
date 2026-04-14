import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, Lock, User, ArrowRight, Loader2, KeyRound, MessageSquare } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login } = useAuth();
  const [step, setStep] = useState(1); // 1: Identity, 2: Mode (Pass/OTP), 3: Signup Fields, 4: OTP Verification
  const [isNewUser, setIsNewUser] = useState(false);
  const [useOtp, setUseOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    identity: '',
    password: '',
    name: '',
    phone: '',
    otp: '',
  });

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (step === 1) {
        // Mock identity check
        if (formData.identity === 'new@khurpatal.com' || formData.identity === '9876543210' || formData.identity.length > 5) {
          // For demo, if identity is long enough, we check
          setIsNewUser(formData.identity.includes('new'));
          setStep(2);
        } else {
          toast.error('Please enter a valid email or mobile number');
        }
      } else if (step === 2) {
        if (isNewUser) {
          setStep(3); // Go to signup fields
        } else {
          if (useOtp) {
            setStep(4);
            toast.info('OTP sent: 123456');
          } else {
            const res = await api.login({ identity: formData.identity, password: formData.password });
            login(res);
            onSuccess();
            toast.success('Welcome back!');
          }
        }
      } else if (step === 3) {
        // Signup -> Go to OTP
        setStep(4);
        toast.info('Verification code sent: 123456');
      } else if (step === 4) {
        if (formData.otp === '123456') {
          if (isNewUser) {
            const res = await api.register({
                name: formData.name,
                email: formData.identity.includes('@') ? formData.identity : `user_${Date.now()}@khurpatal.com`,
                phone: formData.phone || formData.identity,
                password: formData.password
              });
              login(res);
          } else {
              // Login via OTP
              const res = await api.login({ identity: formData.identity, otp: '123456' });
              login(res);
          }
          onSuccess();
          toast.success('Access Granted');
        } else {
          toast.error('Invalid OTP. Use 123456');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 backdrop-blur-xl bg-black/40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Header Theme */}
          <div className="h-32 bg-[#434021] flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
            <div className="w-20 h-20 bg-amber-500 rounded-3xl flex items-center justify-center text-black shadow-2xl shadow-amber-500/20 translate-y-10 border-4 border-white">
                <KeyRound size={40} />
            </div>
          </div>

          <div className="p-10 pt-16">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-10 text-center">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {step === 4 ? 'Secure Verification' : 'Khurpatal Registry'}
              </h3>
              <p className="text-slate-500 text-sm mt-1 font-medium italic">"Where luxury meets security"</p>
            </div>

            <form onSubmit={handleNext} className="space-y-6">
              {step === 1 && (
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-slate-100 pr-3 mr-3 text-slate-300 group-focus-within:text-amber-500 transition-colors">
                        <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Email or Mobile"
                      className="w-full pl-16 pr-4 py-5 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-900" 
                      required
                      value={formData.identity}
                      onChange={(e) => setFormData({...formData, identity: e.target.value})}
                    />
                </div>
              )}

              {step === 2 && !isNewUser && (
                <div className="space-y-6">
                    <div className="flex p-1 bg-slate-100 rounded-2xl">
                        <button 
                            type="button"
                            onClick={() => setUseOtp(false)}
                            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition-all ${!useOtp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                        >
                            Password
                        </button>
                        <button 
                            type="button"
                            onClick={() => setUseOtp(true)}
                            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition-all ${useOtp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                        >
                            OTP Login
                        </button>
                    </div>

                    {!useOtp && (
                        <div className="relative group animate-in slide-in-from-top-2">
                             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={18} />
                             <input 
                                type="password" 
                                placeholder="Secure Password"
                                className="w-full pl-12 pr-4 py-5 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-900" 
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                             />
                        </div>
                    )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-in slide-in-from-right-4">
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={18} />
                      <input 
                        type="text" 
                        placeholder="Full Name"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-900" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={18} />
                      <input 
                        type="password" 
                        placeholder="Strong Password"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-900" 
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 text-center animate-in zoom-in-95">
                  <div className="flex justify-center gap-3">
                    {[0,1,2,3,4,5].map((i) => (
                        <div key={i} className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-lg font-black ${formData.otp[i] ? 'border-amber-500 bg-amber-50 text-amber-600' : 'border-slate-100 bg-slate-50'}`}>
                            {formData.otp[i] || ''}
                        </div>
                    ))}
                  </div>
                  <input 
                    type="text" 
                    maxLength={6}
                    autoFocus
                    className="absolute inset-0 opacity-0 cursor-default"
                    value={formData.otp}
                    onChange={(e) => setFormData({...formData, otp: e.target.value})}
                    required
                  />
                  <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">A 6-digit code has been dispatched</p>
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl shadow-slate-900/20 group disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    <span>{step === 4 ? 'Confirm Access' : 'Continue'}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {step > 1 && (
                <button 
                  type="button"
                  onClick={() => setStep(prev => prev - 1)}
                  className="w-full text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-colors"
                >
                  Return
                </button>
              )}
            </form>
          </div>
          
          <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
             <p className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-2">
                <MessageSquare size={10} />
                Support: help@khurpatal.com
             </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
