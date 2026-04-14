import React, { useState } from 'react';
import { Mail, Phone, Lock, User, ArrowRight, Loader2, KeyRound, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { useBookingFlow } from '../../hooks/useBookingFlow';
import { toast } from 'sonner';

export function AuthStep({ flow }: { flow: ReturnType<typeof useBookingFlow> }) {
  const { handleAuthSuccess, state, setState } = flow;
  const [subStep, setSubStep] = useState<'identity' | 'branch' | 'otp'>('identity');
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    identity: '',
    password: '',
    name: '',
    otp: '',
  });

  const checkIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.checkUser(formData.identity);
      setIsNewUser(!res.exists);
      setSubStep('branch');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isNewUser) {
        // Mock navigate to OTP
        setSubStep('otp');
        toast.info('Verification code sent: 123456');
      } else {
        const res = await api.login({ identity: formData.identity, password: formData.password });
        handleAuthSuccess(res);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otp !== '123456') {
      return toast.error('Invalid code. For demo, use 123456');
    }
    
    setIsLoading(true);
    try {
      if (isNewUser) {
        const res = await api.register({
          name: formData.name,
          email: formData.identity.includes('@') ? formData.identity : `user_${Date.now()}@khurpatal.com`,
          phone: formData.identity.includes('@') ? '' : formData.identity,
          password: formData.password
        });
        handleAuthSuccess(res);
      } else {
        // Login with OTP
        const res = await api.login({ identity: formData.identity, otp: '123456' });
        handleAuthSuccess(res);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-500 mx-auto mb-6 shadow-xl shadow-amber-500/10">
            <KeyRound size={40} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-4">
            {subStep === 'identity' && 'Identify Yourself'}
            {subStep === 'branch' && (isNewUser ? 'Create Registry' : 'Welcome Back')}
            {subStep === 'otp' && 'Verify Identity'}
        </h2>
        <p className="text-slate-500 text-sm font-medium italic">
            {subStep === 'identity' && 'To continue your reservation at Khurpatal Inn'}
            {subStep === 'branch' && (isNewUser ? 'A new member of the mountains' : 'Authenticate to secure your room')}
            {subStep === 'otp' && 'Secure verification for your peace of mind'}
        </p>
      </div>

      <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
        {subStep === 'identity' && (
            <form onSubmit={checkIdentity} className="space-y-6">
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="Email or Mobile"
                      className="w-full pl-12 pr-4 py-5 bg-white border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-900" 
                      required
                      value={formData.identity}
                      onChange={(e) => setFormData({...formData, identity: e.target.value})}
                    />
                </div>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#434021] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl shadow-[#434021]/10 group disabled:opacity-70"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                      <>
                        <span>Continue</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                  )}
                </button>
            </form>
        )}

        {subStep === 'branch' && (
            <form onSubmit={handleAuth} className="space-y-6">
                {isNewUser ? (
                    <div className="space-y-4">
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={20} />
                            <input 
                                type="text" 
                                placeholder="Full Name"
                                className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-900" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={20} />
                            <input 
                                type="password" 
                                placeholder="Create Password"
                                className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-900" 
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={20} />
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="w-full pl-12 pr-4 py-5 bg-white border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold text-slate-900" 
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                )}
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#434021] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl shadow-[#434021]/10 group disabled:opacity-70"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                      <>
                        <span>{isNewUser ? 'Generate Passport' : 'Finalize Login'}</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                  )}
                </button>
            </form>
        )}

        {subStep === 'otp' && (
            <form onSubmit={verifyOtp} className="space-y-8">
                <div className="space-y-6 text-center">
                  <div className="flex justify-center gap-3 otp-container transition-all rounded-2xl p-2">
                    {[0,1,2,3,4,5].map((i) => (
                        <div key={i} className={`w-12 h-14 rounded-2xl border-2 flex items-center justify-center text-xl font-black transition-all ${formData.otp[i] ? 'border-amber-500 bg-amber-50 text-amber-600' : 'border-slate-100 bg-white shadow-inner'}`}>
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
                    onFocus={(e) => e.target.parentElement?.querySelector('.otp-container')?.classList.add('ring-4', 'ring-amber-500/20')}
                    onBlur={(e) => e.target.parentElement?.querySelector('.otp-container')?.classList.remove('ring-4', 'ring-amber-500/20')}
                    required
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Code dispatched via mountain post</p>
                    <p className="text-xs text-amber-600 font-bold">Resend in 0:59</p>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading || formData.otp.length < 6}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl shadow-slate-900/20 group disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                      <>
                        <CheckCircle2 size={18} />
                        <span>Verify & Proceed</span>
                      </>
                  )}
                </button>
            </form>
        )}
      </div>

      <button 
        onClick={() => setSubStep('identity')}
        className="mt-6 w-full text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-900 transition-colors"
      >
        Change Account
      </button>
    </div>
  );
}
