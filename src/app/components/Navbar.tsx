import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User, ChevronDown, CalendarDays, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onMyBookingsClick: () => void;
  onBookNow: () => void;
}

export function Navbar({ onMyBookingsClick, onBookNow }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Dining', href: '#dining' },
    { name: 'Wellness', href: '#wellness' },
    { name: 'Directions', href: '#location' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-[#FBF6EE]/95 backdrop-blur-xl shadow-lg border-b border-[#434021]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <motion.a
            href="#home"
            className="relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-[#434021]" style={{ fontFamily: 'var(--font-heading)' }}>
              Khurpatal Lake Inn
            </h1>
            <p className="text-xs text-[#C6A75E] tracking-widest leading-none mt-1" style={{ fontFamily: 'var(--font-body)' }}>
              UTTARAKHAND
            </p>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-[#434021] hover:text-[#C6A75E] transition-colors duration-300 font-medium relative group text-sm uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C6A75E] group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}

            {isLoggedIn && user?.role !== 'ADMIN' ? (
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 bg-[#434021] text-[#FBF6EE] pl-1.5 pr-4 py-1.5 rounded-full hover:bg-black transition-all shadow-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center font-black text-xs uppercase">
                    {user?.name?.[0]}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <button 
                      onClick={() => { setProfileOpen(false); onMyBookingsClick(); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all group"
                    >
                      <CalendarDays size={18} className="text-slate-400 group-hover:text-amber-500" />
                      <span className="text-sm font-bold">My Bookings</span>
                    </button>
                    <button 
                      onClick={() => { setProfileOpen(false); logout(); window.location.reload(); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all group"
                    >
                      <LogOut size={18} className="text-slate-400 group-hover:text-red-500" />
                      <span className="text-sm font-bold">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <motion.button
                onClick={onBookNow}
                className="px-8 py-3 bg-[#434021] text-[#FBF6EE] rounded-full hover:bg-[#C6A75E] hover:text-[#434021] transition-all duration-300 font-bold shadow-lg text-sm uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Book Now
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#434021] z-[110]"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-0 w-full h-[100dvh] bg-[#FBF6EE] z-[105] pt-32 px-10 flex flex-col"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl text-[#434021] font-bold tracking-tight active:scale-95 transition-transform"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <div className="h-px bg-[#434021]/10 w-full mt-4" />
              
              {isLoggedIn ? (
                <div className="space-y-6">
                    <button 
                         onClick={() => { setMobileMenuOpen(false); onMyBookingsClick(); }}
                         className="flex items-center gap-4 text-2xl font-bold text-amber-600"
                    >
                        <CalendarDays size={32} />
                        My Bookings
                    </button>
                    <button 
                         onClick={() => { setMobileMenuOpen(false); logout(); window.location.reload(); }}
                         className="flex items-center gap-4 text-2xl font-bold text-red-500"
                    >
                        <LogOut size={32} />
                        Logout
                    </button>
                </div>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); onBookNow(); }}
                  className="mt-4 px-8 py-5 bg-[#434021] text-[#FBF6EE] rounded-3xl font-bold text-xl shadow-xl shadow-[#434021]/10"
                >
                  Book My Escape
                </button>
              )}
            </div>
            
            <div className="mt-auto pb-10">
                <p className="text-[10px] font-black text-[#434021]/40 uppercase tracking-[0.2em]">Khurpatal Lake Inn • Uttarakhand</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
