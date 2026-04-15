import React from 'react';
import { motion } from 'motion/react';
import { Instagram, ArrowUpRight } from 'lucide-react';

const INSTA_HANDLE = 'khurpatallakeinn';
const INSTA_URL = `https://www.instagram.com/${INSTA_HANDLE}/`;

const POSTS = [
  {
    id: 1,
    url: '/assets/images/InShot_20240726_2246565361-scaled.jpg',
    link: INSTA_URL
  },
  {
    id: 2,
    url: '/assets/images/caption (13).jpg',
    link: INSTA_URL
  },
  {
    id: 3,
    url: '/assets/images/caption (14).jpg',
    link: INSTA_URL
  },
  {
    id: 4,
    url: '/assets/images/IMG_2690-1-scaled.jpg',
    link: INSTA_URL
  },
  {
    id: 5,
    url: '/assets/images/2025-12-24.jpg',
    link: INSTA_URL
  },
  {
    id: 6,
    url: '/assets/images/caption (1).jpg',
    link: INSTA_URL
  }
];

export function InstagramSection() {
  return (
    <section className="py-24 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-slate-100">
                  <img 
                    src="/assets/images/cropped-Untitled_design_7-SdfZIicur-transformed-transformed.png" 
                    alt={INSTA_HANDLE}
                    className="w-full h-full object-cover scale-125"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                <div className="bg-blue-500 rounded-full p-0.5">
                   <Instagram size={12} className="text-white" />
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Khurpatal Lake Inn
              </h3>
              <p className="text-xs font-bold text-[#C6A75E] mb-2 tracking-widest uppercase">@{INSTA_HANDLE}</p>
              <div className="flex items-center gap-4 mt-1 text-sm font-medium text-slate-500">
                <span><strong className="text-slate-900">45</strong> posts</span>
                <span><strong className="text-slate-900">5,174</strong> followers</span>
              </div>
            </div>
          </div>

          <motion.a
            href={INSTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3 bg-[#434021] text-white rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-[#434021]/20 hover:bg-[#C6A75E] hover:text-[#434021] transition-colors"
          >
            <Instagram size={18} />
            Follow
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {POSTS.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square group overflow-hidden rounded-2xl shadow-sm border border-slate-100"
            >
              <img 
                src={post.url} 
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                 <Instagram className="text-white" size={24} />
                 <span className="text-white text-[10px] font-bold uppercase tracking-widest">View Post</span>
              </div>

              {/* Handle Tag */}
              <div className="absolute bottom-3 left-3 right-3 py-2 px-3 bg-white/90 backdrop-blur-md rounded-lg flex items-center justify-between opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <div className="flex items-center gap-2">
                   <Instagram size={12} className="text-slate-900" />
                   <span className="text-[10px] font-black text-slate-900">@{INSTA_HANDLE}</span>
                </div>
                <ArrowUpRight size={12} className="text-slate-400" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 text-center">
            <p className="text-slate-400 text-xs font-medium tracking-wide">
                Join our community in the Himalayas. Tag us in your stories <span className="text-[#C6A75E] font-bold">#{INSTA_HANDLE}</span>
            </p>
        </div>
      </div>
    </section>
  );
}
