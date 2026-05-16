'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Award, Briefcase, Scale, Clock } from 'lucide-react';
import AnimatedCounter from './ui/AnimatedCounter';
import { slideInLeft, slideInRight, staggerContainer, fadeUp } from '@/lib/animations';

/**
 * Drop a real headshot at /public/images/anwar-khan.jpg (square ~800x800).
 * Until then, this falls back to the existing project portrait file.
 */
const PORTRAIT_SRC = '/images/about-profile.png';

const stats = [
  { icon: Award, value: 20, suffix: '+', label: 'Years Experience' },
  { icon: Briefcase, value: 5000, suffix: '+', label: 'Cases Handled' },
  { icon: Scale, value: 8, suffix: '', label: 'Practice Areas' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Always Open' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Rotating conic ring */}
              <motion.div
                className="absolute -inset-3 rounded-full ring-conic"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                style={{ padding: 3 }}
              />
              {/* Avatar */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-secondary border-4 border-white shadow-ink">
                {/* Drop real photo at /public/images/anwar-khan.jpg */}
                <Image
                  src={PORTRAIT_SRC}
                  alt="Anwar Khan, Legal Consultant"
                  fill
                  sizes="(min-width: 1024px) 384px, 320px"
                  className="object-cover object-[35%_42%] scale-110"
                  priority
                />
              </div>

              {/* Floating credential card */}
              <motion.div
                initial={{ opacity: 0, y: 30, x: 30 }}
                animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-6 -right-4 lg:-right-10 glass shadow-ink rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-flame flex items-center justify-center text-white">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-secondary/60">Since</div>
                  <div className="font-display font-extrabold text-secondary text-xl leading-none">2004</div>
                </div>
              </motion.div>

              {/* Floating "regulated" badge */}
              <motion.div
                initial={{ opacity: 0, y: -20, x: -20 }}
                animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -top-4 -left-4 lg:-left-8 bg-secondary text-white rounded-2xl px-4 py-3 shadow-ink"
              >
                <div className="text-[10px] uppercase tracking-widest-plus text-primary">Trusted</div>
                <div className="text-sm font-semibold">Authorized & Regulated</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bio + stats */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <span className="inline-block text-xs uppercase tracking-widest-plus font-semibold text-primary">
              About the Consultant
            </span>
            <h2 className="swoosh-divider mt-3 font-display font-extrabold text-secondary text-4xl md:text-5xl leading-[1.05]">
              Two decades of <span className="text-primary">trusted</span> legal guidance.
            </h2>

            <p className="mt-6 text-secondary/75 text-lg leading-relaxed">
              For over 20 years, <strong>Anwar Khan</strong> has provided expert legal services across
              immigration, family law, property conveyancing, and more. Based in East London, he is
              committed to treating every case — however big or small — like it mattered.
            </p>

            <p className="mt-4 text-secondary/70 leading-relaxed">
              From visa refusals to first-home purchases, from divorce to dispute resolution, his
              practice is built on three principles: <em>personalized support</em>, <em>transparent
              fixed fees</em>, and a <em>risk-free evaluation</em> of every case.
            </p>

            {/* Stats grid */}
            <motion.div
              variants={staggerContainer(0.12, 0.4)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="relative p-5 rounded-2xl bg-white border border-secondary/10 hover:border-primary/40 hover:shadow-flame-sm transition-all duration-300"
                >
                  <s.icon className="w-5 h-5 text-primary" />
                  <div className="mt-3 font-display font-extrabold text-2xl md:text-3xl text-secondary leading-none tracking-tight whitespace-nowrap">
                    {typeof s.value === 'number' && s.suffix !== '/7' ? (
                      <AnimatedCounter to={s.value} suffix={s.suffix} />
                    ) : (
                      <>
                        {s.value}
                        <span className="text-primary">{s.suffix}</span>
                      </>
                    )}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-secondary/60">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
