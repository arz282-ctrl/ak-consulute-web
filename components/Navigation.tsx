'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const mobileHeader = (
    <>
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-[9999]"
        style={{ position: 'fixed' }}
      >
        <div className="w-full px-3 pt-3">
          <div className="relative">
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.45)',
                    backdropFilter: 'saturate(200%) blur(24px)',
                    WebkitBackdropFilter: 'saturate(200%) blur(24px)',
                    boxShadow: '0 8px 32px rgba(10,22,40,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
                    border: '1px solid rgba(255,255,255,0.5)',
                  }}
                />
              )}
            </AnimatePresence>
            <div className="relative px-3 py-[5px]">
              <div className="flex items-center justify-between">
                <a href="#top" className="flex items-center gap-2 shrink-0" aria-label="Anwar Khan — Legal Consultant">
                  <span className="relative block w-[53.1px] h-[53.1px] overflow-hidden translate-y-[6px] translate-x-[7px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/logo-a.png" alt="" className="absolute inset-0 w-full h-full object-contain scale-[1.85]" />
                  </span>
                  <span className="flex flex-col leading-none ml-[-8.5px]">
                    <span className="font-display font-extrabold text-[10.6px] tracking-tight text-secondary">Anwar Khan</span>
                    <span className="mt-0.5 font-sans font-medium text-[8.6px] uppercase tracking-[0.32em] text-secondary/55">Legal Consultant</span>
                  </span>
                </a>
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="inline-flex items-center justify-center w-[39px] h-[39px] rounded-full bg-secondary text-white"
                  aria-label="Menu"
                >
                  {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] inset-x-4 z-[9998] md:hidden glass rounded-2xl p-4 shadow-ink"
            style={{ position: 'fixed' }}
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

  return (
    <>
      {/* Portal mobile header + dropdown to document.body so no ancestor transform/overflow can break position:fixed */}
      {mounted && createPortal(mobileHeader, document.body)}

      {/* ── DESKTOP: transparent top bar → compact glass pill on scroll ── */}
      <header className="hidden md:block fixed top-0 inset-x-0 z-50 pointer-events-none">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pt-4">
          <div className="relative">
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  initial={{ y: -20, opacity: 0, scale: 0.98 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -20, opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.72)',
                    backdropFilter: 'saturate(180%) blur(18px)',
                    WebkitBackdropFilter: 'saturate(180%) blur(18px)',
                    boxShadow: '0 4px 24px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)',
                    border: '1px solid rgba(10,22,40,0.06)',
                  }}
                />
              )}
            </AnimatePresence>

            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-between py-3 px-5 pointer-events-auto"
            >
              <a
                href="#top"
                className="flex items-center gap-2 shrink-0"
                aria-label="Anwar Khan — Legal Consultant"
              >
                <span className="relative block w-[60px] h-[60px] overflow-hidden translate-y-[4px] translate-x-[8px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo-a.png" alt="" className="absolute inset-0 w-full h-full object-contain scale-[1.85]" />
                </span>
                <span className="flex flex-col leading-none ml-[-10px]">
                  <span className="font-display font-extrabold text-[11.5px] tracking-tight text-secondary">Anwar Khan</span>
                  <span className="mt-0.5 font-sans font-medium text-[9px] uppercase tracking-[0.32em] text-secondary/55">Legal Consultant</span>
                </span>
              </a>

              <NavHeader items={links} />

              <div className="flex items-center gap-3">
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
            </motion.div>
          </div>
        </div>
      </header>
    </>
  );
}
