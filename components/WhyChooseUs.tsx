'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Check, HeartHandshake, BadgeDollarSign, Award, Languages } from 'lucide-react';
import { staggerContainer, fadeUp } from '@/lib/animations';

const features = [
  {
    icon: HeartHandshake,
    title: 'Personalized Support',
    desc: 'Every case treated like it mattered — because it does.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Transparent Fixed Fees',
    desc: 'No hidden costs. Know what you pay before we start.',
  },
  {
    icon: Award,
    title: '20+ Years Experience',
    desc: 'In practice since 2004. Battle-tested, client-trusted.',
  },
  {
    icon: Languages,
    title: 'Multilingual Support',
    desc: (
      <>
        Fluent service in{' '}
        <strong className="font-bold text-white">English</strong>,{' '}
        <strong className="font-bold text-white">Bengali</strong>,{' '}
        <strong className="font-bold text-white">Hindi</strong>,{' '}
        <strong className="font-bold text-white">Urdu</strong> &amp;{' '}
        <strong className="font-bold text-white">Polish</strong> for the community.
      </>
    ),
  },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section
      id="why"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-secondary text-white"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-0"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-ink bg-[length:200%_200%] animate-gradient-shift" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-0 left-0 w-[520px] h-[520px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-secondary-400/30 blur-3xl" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="inline-block text-xs uppercase tracking-widest-plus font-semibold text-primary">
            Why Choose Us
          </span>
          <h2 className="mt-3 font-display font-extrabold text-4xl md:text-5xl leading-[1.05]">
            Built on trust. <span className="text-primary">Delivered</span> with care.
          </h2>
          <p className="mt-5 text-white/70 leading-relaxed">
            We empower and educate our clients — turning complex legal challenges into clear next steps.
          </p>
        </motion.div>

        <motion.ul
          variants={staggerContainer(0.12, 0.2)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((f) => (
            <motion.li
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative p-6 rounded-2xl glass-dark hover:bg-white/[0.08] hover:border-primary/40 transition-all duration-500 group"
            >
              {/* Animated orange check on hover */}
              <div className="absolute top-5 right-5 w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
              </div>

              <div className="w-12 h-12 rounded-xl bg-gradient-flame text-white flex items-center justify-center shadow-flame-sm">
                <f.icon className="w-5 h-5" />
              </div>

              <h3 className="mt-5 font-display font-bold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{f.desc}</p>

              {/* Bottom accent */}
              <div className="mt-5 h-[2px] w-10 rounded-full bg-gradient-flame group-hover:w-full transition-all duration-700" />
            </motion.li>
          ))}
        </motion.ul>

        {/* Empowerment quote strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <p className="font-display italic text-xl md:text-2xl text-white/85 leading-snug">
            “Empowerment and education are the foundation of every case we take —
            <span className="text-primary"> because informed clients make confident decisions.</span>”
          </p>
        </motion.div>
      </div>
    </section>
  );
}
