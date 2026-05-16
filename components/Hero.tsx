'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, ShieldCheck, Languages, Sparkles } from 'lucide-react';
import GradientButton from './ui/GradientButton';
import FloatingShapes from './ui/FloatingShapes';
import { staggerContainer, wordReveal, fadeUp, easeOutQuint } from '@/lib/animations';

const headlineWords = ['Anwar', 'Khan', '—', 'Legal', 'Consultant'];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-ink bg-[length:200%_200%] animate-gradient-shift"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      {/* Floating shapes */}
      <FloatingShapes />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(245,124,32,0.18)_0%,transparent_55%)]" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen text-center"
      >
        {/* Eyebrow chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: easeOutQuint }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark border-white/15 text-white/90 text-xs font-medium tracking-widest uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          In Practice Since 2004 · London, UK
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <motion.h1
          variants={staggerContainer(0.12, 0.2)}
          initial="hidden"
          animate="show"
          className="mt-8 font-display font-extrabold tracking-tight text-white leading-[0.95] text-[clamp(2.5rem,7vw,5.75rem)]"
          style={{ perspective: 800 }}
        >
          {headlineWords.map((w, i) => (
            <motion.span
              key={i}
              variants={wordReveal}
              className={`inline-block mr-3 ${
                w === '—' ? 'text-primary' : w === 'Legal' || w === 'Consultant' ? 'text-shimmer' : ''
              }`}
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: easeOutQuint }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-white/75 leading-relaxed"
        >
          Experienced Legal Mentor offering personalized, fixed-fee counsel across Immigration,
          Family Law, Conveyancing & more. Treating every case — however big or small — like it matters.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: easeOutQuint }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-ring" aria-hidden />
            <GradientButton href="#contact" size="lg" withArrow>
              Book A Consultation
            </GradientButton>
          </div>
          <GradientButton href="#services" size="lg" variant="ghost" withArrow={false} className="!text-white !bg-white/10 !border-white/20 hover:!border-primary">
            Explore Services
          </GradientButton>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          variants={staggerContainer(0.1, 1.3)}
          initial="hidden"
          animate="show"
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/70 text-sm"
        >
          {[
            { icon: ShieldCheck, label: 'Authorized & Regulated' },
            { icon: Languages, label: 'English · Bengali' },
            { icon: Sparkles, label: 'Risk-Free Evaluation' },
          ].map((b, i) => (
            <motion.div key={i} variants={fadeUp} className="inline-flex items-center gap-2">
              <b.icon className="w-4 h-4 text-primary" />
              {b.label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-primary transition-colors"
        aria-label="Scroll to next section"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-widest-plus uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
