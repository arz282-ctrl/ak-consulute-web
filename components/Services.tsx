'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Plane,
  Users,
  ScrollText,
  Home,
  Briefcase,
  Key,
  Gavel,
  Scale,
  ArrowUpRight,
} from 'lucide-react';
import { staggerContainer, fadeUp } from '@/lib/animations';
import VerticalTabs from '@/components/ui/vertical-tabs';
import RuixenBentoCards from '@/components/ui/ruixen-bento-cards';

const services = [
  {
    icon: Plane,
    title: 'Immigration Assistance',
    desc: 'Visa refusals, UK immigration cases, settlement & appeals.',
  },
  {
    icon: Users,
    title: 'Family Law',
    desc: 'Divorce, child custody, maintenance & family disputes.',
  },
  {
    icon: ScrollText,
    title: 'Wills & Estate Planning',
    desc: 'Probate, will drafting, estate administration.',
  },
  {
    icon: Home,
    title: 'Property & Conveyancing',
    desc: 'First-home buying, buying & selling, transfers.',
  },
  {
    icon: Briefcase,
    title: 'Employment Issues',
    desc: 'Workplace disputes, contracts, dismissal advice.',
  },
  {
    icon: Key,
    title: 'Lease & Licence',
    desc: 'Landlord-tenant disputes, lease agreements.',
  },
  {
    icon: Gavel,
    title: 'Litigation & Disputes',
    desc: 'Civil litigation, dispute resolution & mediation.',
  },
  {
    icon: Scale,
    title: 'Civil Legal Services',
    desc: 'Comprehensive civil law advisory & representation.',
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-white via-primary/[0.02] to-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

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

        {/* Animated visuals carousel — desktop only */}
        <div className="hidden lg:block mt-12 lg:mt-16">
          <VerticalTabs />
        </div>

        {/* Updated bento cards + Civil Legal Services visual — desktop only */}
        <div className="hidden lg:block mt-12 lg:mt-14">
          <RuixenBentoCards />
        </div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer(0.08, 0.2)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              className="group relative flex flex-col gap-3 rounded-lg border border-secondary/10 bg-white/50 p-6 text-center backdrop-blur-xs transition-all hover:border-primary/20 hover:bg-white/80 hover:shadow-lg active:scale-95"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-gradient-flame p-2.5 transition-transform group-hover:scale-110">
                <s.icon className="h-full w-full text-white" />
              </div>
              <h3 className="font-display font-semibold text-secondary">{s.title}</h3>
              <p className="text-xs leading-relaxed text-secondary/70">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
