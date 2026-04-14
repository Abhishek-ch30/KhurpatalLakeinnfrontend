import { motion } from 'motion/react';
import { PartyPopper, Users, Cake, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Experiences() {
  const experiences = [
    {
      icon: Users,
      title: 'Group Bookings',
      description: 'Perfect for corporate retreats, team outings, and large groups',
      image: 'https://images.unsplash.com/photo-1768932282108-c06f2d7026a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxpbmZpbml0eSUyMHBvb2wlMjBtb3VudGFpbiUyMHZpZXclMjByZXNvcnR8ZW58MXx8fHwxNzc2MTU0MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Cake,
      title: 'Celebrations',
      description: 'Birthdays, anniversaries, and special occasions made memorable',
      image: 'https://images.unsplash.com/photo-1775589805702-1bc62e544d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxpbmZpbml0eSUyMHBvb2wlMjBtb3VudGFpbiUyMHZpZXclMjByZXNvcnR8ZW58MXx8fHwxNzc2MTU0MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Heart,
      title: 'Romantic Getaways',
      description: 'Intimate settings perfect for couples and honeymooners',
      image: 'https://images.unsplash.com/photo-1713149733386-9565729633ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxpbmZpbml0eSUyMHBvb2wlMjBtb3VudGFpbiUyMHZpZXclMjByZXNvcnR8ZW58MXx8fHwxNzc2MTU0MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: PartyPopper,
      title: 'Adventure Activities',
      description: 'Trekking, nature walks, and outdoor adventures',
      image: 'https://images.unsplash.com/photo-1619773473286-a3361c810826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx1dHRhcmFraGFuZCUyMG1vdW50YWlucyUyMG5haW5pdGFsJTIwbGFrZXxlbnwxfHx8fDE3NzYxNTQwOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <section className="py-32 px-6 lg:px-12 bg-[#FBF6EE]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[#C6A75E] tracking-widest text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>
            EXPERIENCES
          </span>
          <h2 className="text-4xl lg:text-6xl text-[#434021] mt-4 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Unforgettable Moments
          </h2>
          <p className="text-lg text-[#434021]/70 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Create lasting memories with our curated experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Image */}
              <div className="relative h-96">
                <ImageWithFallback
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="w-14 h-14 rounded-2xl bg-[#C6A75E] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <experience.icon className="text-white" size={28} />
                </div>
                <h3 className="text-2xl text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {experience.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  {experience.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
