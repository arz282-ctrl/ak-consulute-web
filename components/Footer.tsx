'use client';

import { motion } from 'framer-motion';
import { Facebook, MessageCircle, ArrowUp, Mail } from 'lucide-react';
import Logo from './Logo';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Immigration',
  'Family Law',
  'Wills & Probate',
  'Conveyancing',
  'Employment',
  'Litigation',
];

export default function Footer() {
  return (
    <footer className="relative bg-secondary text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-ink bg-[length:200%_200%] animate-gradient-shift opacity-90" />
      <div className="absolute -top-32 right-0 w-[480px] h-[480px] bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <a
              href="#top"
              className="flex items-center gap-3 shrink-0"
              aria-label="Anwar Khan — Legal Consultant"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-a.png"
                alt=""
                className="h-[86px] w-auto block translate-y-[1.5px] translate-x-[2.8px]"
              />
              <span className="flex flex-col leading-none ml-[-51px] mt-[-5.4px]">
                <span className="font-display font-extrabold text-[11px] tracking-tight text-white">
                  Anwar Khan
                </span>
                <span className="mt-1 font-sans font-medium text-[9px] uppercase tracking-[0.32em] text-white/55">
                  Legal Consultant
                </span>
              </span>
            </a>
            <p className="mt-5 text-white/65 max-w-sm leading-relaxed">
              Experienced legal mentor. In practice since 2004. Personalized,
              transparent, multilingual counsel for the UK and South Asian community.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              <SocialIcon href="https://www.facebook.com/share/1EEPoyRRfx/" label="Facebook">
                <Facebook className="w-4 h-4" />
              </SocialIcon>
              <SocialIcon href="https://wa.me/447459641859" label="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </SocialIcon>
              <SocialIcon href="mailto:contact@akconsultant.uk" label="Email">
                <Mail className="w-4 h-4" />
              </SocialIcon>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest-plus text-primary">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest-plus text-primary">
              Services
            </h4>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-white/55">
            © 2025 Anwar Khan Legal Consultant. All rights reserved.
          </p>
          <p className="text-xs text-white/45">
            432 Green Street, London, E13 9JJ · akconsultant.uk
          </p>

          {/* Back to top */}
          <motion.a
            href="#top"
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-primary"
          >
            Back to top <ArrowUp className="w-3.5 h-3.5" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -3, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors"
    >
      {children}
    </motion.a>
  );
}
