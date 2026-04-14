import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={ref} className="relative py-32 px-6 lg:px-12 bg-gradient-to-b from-[#FBF6EE] to-[#E3E3C1] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-[#C6A75E] tracking-widest text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                OUR STORY
              </span>
              <h2 className="text-4xl lg:text-6xl text-[#434021] mt-4 mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Escape the noise.
                <br />
                Discover serenity.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-[#434021]/80 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Nestled in the heart of Uttarakhand's pristine mountains, Khurpatal Lake Inn is more than a destination—it's an experience. Overlooking the tranquil Khurpatal Lake, our boutique hotel offers a perfect blend of luxury and nature.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="text-lg text-[#434021]/80 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Far from the crowded tourist spots, we provide an intimate escape where you can reconnect with nature, indulge in comfort, and create memories that last a lifetime.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="mt-8 px-8 py-4 bg-[#434021] text-[#FBF6EE] rounded-full hover:bg-[#C6A75E] hover:text-[#434021] transition-all duration-300 shadow-lg"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Image with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1732510291351-43c68b3ca022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHx1dHRhcmFraGFuZCUyMG1vdW50YWlucyUyMG5haW5pdGFsJTIwbGFrZXxlbnwxfHx8fDE3NzYxNTQwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Scenic view of Khurpatal Lake"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#434021]/40 to-transparent"></div>
            </motion.div>

            {/* Floating Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -right-8 backdrop-blur-xl bg-white/80 border border-white/40 rounded-2xl p-6 shadow-xl max-w-xs"
            >
              <p className="text-3xl font-bold text-[#434021] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                5 Star
              </p>
              <p className="text-sm text-[#434021]/70" style={{ fontFamily: 'var(--font-body)' }}>
                Luxury Experience in the Heart of Nature
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
