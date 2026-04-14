import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ChevronRight, 
  ShieldCheck, 
  ArrowLeft 
} from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.login({ identity: email, password });
      
      if (response.role !== 'ADMIN') {
        setError('Access denied. You do not have administrator privileges.');
        return;
      }

      login(response);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF6EE] flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-600 mb-8 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to website
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-amber-900/5 border border-slate-100 p-10 md:p-12">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/20 mb-6">
              <ShieldCheck className="text-black" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Portal</h1>
            <p className="text-slate-500 mt-2">Secure access for Khurpatal Lake Inn management.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="text-slate-300 group-focus-within:text-amber-500 transition-colors" size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all"
                  placeholder="admin@khurpatal.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="text-slate-300 group-focus-within:text-amber-500 transition-colors" size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-red-500 text-sm bg-red-50 p-4 rounded-xl border border-red-100"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-slate-900/10 group active:scale-95"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Enter Dashboard
                  <ChevronRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 flex items-center justify-center gap-4 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Secure Environment
            </span>
            <span className="text-slate-200">|</span>
            <span>256-bit Encryption</span>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-400 text-sm">
          Protected by Khurpatal Security System.
        </p>
      </motion.div>
    </div>
  );
};
