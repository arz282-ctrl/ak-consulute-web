'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Globe, Phone, MapPin } from 'lucide-react';

const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const map = {
    website: Globe,
    phone: Phone,
    address: MapPin,
  } as const;
  const Icon = map[type];
  return (
    <div className="mr-2 flex-shrink-0">
      <Icon className="h-5 w-5 text-primary" />
    </div>
  );
};

interface HeroSectionProps extends Omit<HTMLMotionProps<'section'>, 'title'> {
  logo?: {
    url: string;
    alt: string;
    text?: string;
  };
  slogan?: string;
  title: React.ReactNode;
  subtitle: string;
  callToAction: {
    text: string;
    href: string;
  };
  backgroundImage: string;
  contactInfo: {
    website: string;
    phone: string;
    address: string;
  };
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      logo,
      slogan,
      title,
      subtitle,
      callToAction,
      backgroundImage,
      contactInfo,
      ...props
    },
    ref,
  ) => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
      },
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' as const },
      },
    };

    return (
      <motion.section
        ref={ref}
        className={cn(
          'relative flex w-full flex-col overflow-hidden bg-background text-foreground md:flex-row',
          className,
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...props}
      >
        {/* Left Side: Content — main block vertically centered, contact strip pinned to bottom */}
        <div className="flex w-full flex-col px-5 pt-24 pb-10 sm:p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16 md:pt-36 md:min-h-screen">
          <div className="flex-1 flex flex-col justify-center">
            {/* Optional logo lockup (omit when nav already shows brand identity) */}
            {logo && (
              <motion.header className="mb-10" variants={itemVariants}>
                <div className="flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.url} alt={logo.alt} className="mr-3 h-10 w-auto" />
                  <div>
                    {logo.text && (
                      <p className="text-lg font-bold text-foreground">{logo.text}</p>
                    )}
                  </div>
                </div>
              </motion.header>
            )}

            <motion.main variants={containerVariants}>
              {slogan && (
                <motion.div
                  className="mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary"
                  variants={itemVariants}
                >
                  <span className="inline-block h-px w-8 bg-primary" />
                  {slogan}
                </motion.div>
              )}
              <motion.h1
                className="mt-1 font-display text-[30px] sm:text-[36px] font-extrabold leading-[1.05] tracking-tight text-foreground md:text-[42px] lg:text-5xl xl:text-[56px]"
                variants={itemVariants}
              >
                {title}
              </motion.h1>
              <motion.p
                className="mb-8 mt-6 max-w-md text-base text-muted-foreground leading-relaxed"
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>

              {/* Elegant trust chips — navy fill on hover/active */}
              <motion.div
                className="mb-7 flex flex-wrap items-center gap-1.5"
                variants={itemVariants}
              >
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors duration-300 hover:border-secondary hover:bg-secondary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70 group-hover:bg-white" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-white" />
                  </span>
                  Accepting new clients
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-secondary/15 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary transition-colors duration-300 hover:border-secondary hover:bg-secondary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
                >
                  <span className="text-primary group-hover:text-white">★</span>
                  20+ Years
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-secondary/15 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-secondary transition-colors duration-300 hover:border-secondary hover:bg-secondary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
                >
                  5 Languages
                </motion.button>
              </motion.div>

              {/* CTA cluster — secondary explore (small) above primary book */}
              <motion.div
                className="flex flex-col items-start gap-3"
                variants={itemVariants}
              >
                <a
                  href="#services"
                  className="group inline-flex items-center gap-2.5 rounded-full border-2 border-secondary/25 bg-white/60 backdrop-blur px-6 py-3 text-sm font-bold text-secondary transition-all hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary hover:text-white"
                >
                  Explore Services
                  <span
                    aria-hidden
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-white/20 group-hover:text-white"
                  >
                    →
                  </span>
                </a>
                <a
                  href={callToAction.href}
                  className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm md:text-base font-bold text-white shadow-flame transition-all hover:-translate-y-0.5 hover:brightness-105"
                >
                  {callToAction.text}
                  <span
                    aria-hidden
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
              </motion.div>
            </motion.main>
          </div>

          <motion.footer className="mt-auto pt-10 w-full" variants={itemVariants}>
            <div className="grid grid-cols-1 gap-4 text-xs text-muted-foreground sm:grid-cols-3 sm:gap-6">
              <div className="flex items-center">
                <InfoIcon type="website" />
                <span>{contactInfo.website}</span>
              </div>
              <div className="flex items-center">
                <InfoIcon type="phone" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <InfoIcon type="address" />
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </motion.footer>
        </div>

        {/* Right Side: Portrait with flame halo + clip-path slide */}
        <div className="relative w-full md:w-1/2 lg:w-2/5">
          {/* Soft flame halo glow behind the portrait */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0"
          >
            <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-primary/25 blur-[120px]" />
            <div className="absolute right-[-10%] top-[20%] w-[280px] h-[280px] rounded-full bg-primary/30 blur-[90px]" />
          </div>

          <motion.div
            className="relative w-full h-[420px] sm:h-[480px] bg-cover md:h-auto md:min-h-[100vh]"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: 'center 22%',
              backgroundSize: 'cover',
            }}
            initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
            animate={{ clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)' }}
            transition={{ duration: 1.2, ease: 'circOut' }}
          />

        </div>
      </motion.section>
    );
  },
);

HeroSection.displayName = 'HeroSection';

export { HeroSection };
