'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import VerticalTabs from '@/components/ui/vertical-tabs';
import RuixenBentoCards from '@/components/ui/ruixen-bento-cards';

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-white via-primary/[0.02] to-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      {/* Subtle ambient glows — break up the flat white */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-32 w-[520px] h-[520px] bg-primary/[0.08] rounded-full blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute top-1/3 -right-40 w-[460px] h-[460px] bg-secondary/[0.06] rounded-full blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/3 w-[420px] h-[420px] bg-primary/[0.05] rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="inline-block text-xs uppercase tracking-widest-plus font-semibold text-primary">
            Practice Areas
          </span>
          <h2 className="mt-3 font-display font-extrabold text-secondary text-4xl md:text-5xl leading-[1.05]">
            Our Legal <span className="text-primary">Services</span>
          </h2>
          <p className="mt-5 text-secondary/70 leading-relaxed">
            Eight areas of practice, one consistent standard: thorough, transparent, and tailored to
            the people we serve.
          </p>
          <div className="mt-6 mx-auto h-1 w-16 rounded-full bg-gradient-flame" />
        </motion.div>

        {/* Featured practice areas — interactive showcase */}
        <div className="mt-10 md:mt-14">
          <VerticalTabs />
        </div>

        {/* Remaining practice areas — bento grid */}
        <div className="mt-12 md:mt-16">
          <RuixenBentoCards />
        </div>
      </div>
    </section>
  );
}
