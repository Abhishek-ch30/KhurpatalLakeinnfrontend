import { motion } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1761442663511-2558e561f15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZpbml0eSUyMHBvb2wlMjBtb3VudGFpbiUyMHZpZXclMjByZXNvcnR8ZW58MXx8fHwxNzc2MTU0MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Infinity Pool',
      span: 'col-span-2 row-span-2',
    },
    {
      url: 'https://images.unsplash.com/photo-1732510291351-43c68b3ca022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHx1dHRhcmFraGFuZCUyMG1vdW50YWlucyUyMG5haW5pdGFsJTIwbGFrZXxlbnwxfHx8fDE3NzYxNTQwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Lake View',
      span: 'col-span-1 row-span-1',
    },
    {
      url: 'https://images.unsplash.com/photo-1760067537740-faa11f7bdf1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMHJvb20lMjB3b29kZW4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzYxNTQwOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Luxury Room',
      span: 'col-span-1 row-span-1',
    },
    {
      url: 'https://images.unsplash.com/photo-1580823648704-cc045be42add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjByZXNvcnQlMjBkaW5pbmclMjByZXN0YXVyYW50JTIwZWxlZ2FudHxlbnwxfHx8fDE3NzYxNTQxMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Dining',
      span: 'col-span-1 row-span-1',
    },
    {
      url: 'https://images.unsplash.com/photo-1767950470198-c9cd97f8ed87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHJlc29ydCUyMG5pZ2h0JTIwdmlldyUyMGx1eHVyeXxlbnwxfHx8fDE3NzYxNTQxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Night View',
      span: 'col-span-1 row-span-1',
    },
    {
      url: 'https://images.unsplash.com/photo-1761971974992-6df33df97c3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGd5bSUyMGZpdG5lc3MlMjBtb2Rlcm58ZW58MXx8fHwxNzc2MTU0MTAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Gym',
      span: 'col-span-2 row-span-1',
    },
  ];

  return (
    <section id="gallery" className="py-32 px-6 lg:px-12 bg-gradient-to-b from-[#FBF6EE] to-[#E3E3C1]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[#C6A75E] tracking-widest text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>
            EXPLORE
          </span>
          <h2 className="text-4xl lg:text-6xl text-[#434021] mt-4 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Gallery
          </h2>
          <p className="text-lg text-[#434021]/70 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            A glimpse into the beauty and luxury that awaits you
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`${image.span} relative overflow-hidden rounded-3xl shadow-xl group cursor-pointer`}
            >
              <div className="relative h-full min-h-[250px]">
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="text-white text-2xl"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {image.title}
                  </motion.p>
                </div>

                {/* Blur Border Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl border-4 border-[#C6A75E] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl text-[#434021] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Follow Us on Instagram
          </h3>
          <p className="text-[#434021]/70 mb-8" style={{ fontFamily: 'var(--font-body)' }}>
            @khurpatallakeinn
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Follow Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
