'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import GradientButton from './ui/GradientButton';
import NavHeader from './ui/nav-header';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/*
        Nav is fixed at the top of the viewport.
        Result: it stays visible at the top regardless of scroll position.
      */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 py-5 transition-all duration-300 ${
          scrolled
            ? 'bg-white/70 backdrop-blur-md shadow-sm border-b border-white/30'
            : 'bg-transparent'
        }`}
      >
        {/* Full-width bar: logo hugs the left edge, links sit centered over the text column,
            phone + CTA hug the right edge so they land above the portrait. */}
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="relative flex items-center justify-between bg-transparent py-2">
            <a
              href="#top"
              className="flex items-center gap-2 md:gap-3 shrink-0 md:self-end md:translate-y-[15.5px]"
              aria-label="Anwar Khan — Legal Consultant"
            >
              {/* Mobile: crop the source PNG's transparent padding by wrapping in a tight box and scaling the visible A up.
                  Desktop: render the image at native ratio (existing pixel-pushed lockup). */}
              <span className="relative block w-[53.1px] h-[53.1px] overflow-hidden translate-y-[6px] translate-x-[7px] md:translate-x-0 md:translate-y-0 md:w-auto md:h-[86px] md:overflow-visible">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo-a.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-contain scale-[1.85] md:static md:scale-100 md:w-auto md:translate-y-[5.8px] md:translate-x-[16px]"
                />
              </span>
              <span className="flex flex-col leading-none ml-[-8.5px] md:ml-[-38px]">
                <span className="font-display font-extrabold text-[10.6px] md:text-[11px] tracking-tight text-secondary">
                  Anwar Khan
                </span>
                <span className="mt-0.5 md:mt-1 font-sans font-medium text-[8.6px] md:text-[9px] uppercase tracking-[0.32em] text-secondary/55">
                  Legal Consultant
                </span>
              </span>
            </a>

            {/* Absolute-centered pill nav — sits perfectly mid-viewport regardless of left/right widths */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <NavHeader items={links} />
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+447459641859"
                className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-secondary/80 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +44 7459 641859
              </a>
              <GradientButton href="/book" size="md" withArrow>
                Book A Consultation
              </GradientButton>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-[39px] h-[39px] rounded-full bg-secondary text-white -translate-y-[1.6px]"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-20 inset-x-4 z-40 md:hidden glass rounded-2xl p-4 shadow-ink"
          >
            <div className="flex flex-col">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-3 text-secondary font-medium border-b border-secondary/5 last:border-0"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="pt-3">
                <GradientButton href="/book" size="md" className="w-full justify-center">
                  Book A Consultation
                </GradientButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
