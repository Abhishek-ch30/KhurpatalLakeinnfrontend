import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Delhi',
      rating: 5,
      text: 'An absolutely stunning property! The views from our room were breathtaking, and the staff made us feel like royalty. The perfect escape from the city.',
      avatar: 'PS',
    },
    {
      name: 'Rahul Mehta',
      location: 'Mumbai',
      rating: 5,
      text: 'We celebrated our anniversary here and it couldn\'t have been more perfect. The attention to detail, the food, and the ambiance - everything was top-notch.',
      avatar: 'RM',
    },
    {
      name: 'Anjali Verma',
      location: 'Bangalore',
      rating: 5,
      text: 'The infinity pool with mountain views is a dream! The rooms are spacious and beautifully designed. Can\'t wait to visit again with family.',
      avatar: 'AV',
    },
  ];

  return (
    <section className="py-32 px-6 lg:px-12 bg-gradient-to-b from-[#E3E3C1] to-[#FBF6EE]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[#C6A75E] tracking-widest text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>
            TESTIMONIALS
          </span>
          <h2 className="text-4xl lg:text-6xl text-[#434021] mt-4 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            What Our Guests Say
          </h2>
          <p className="text-lg text-[#434021]/70 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Read what travelers love about their experience at Khurpatal Lake Inn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative backdrop-blur-2xl bg-white/70 border border-white/80 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#C6A75E] rounded-full flex items-center justify-center shadow-lg">
                <Quote className="text-white" size={24} />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-[#C6A75E] fill-[#C6A75E]" size={20} />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[#434021]/80 mb-6 leading-relaxed italic" style={{ fontFamily: 'var(--font-body)' }}>
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C6A75E] to-[#434021] flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-[#434021] font-medium" style={{ fontFamily: 'var(--font-heading)' }}>
                    {testimonial.name}
                  </p>
                  <p className="text-[#434021]/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
