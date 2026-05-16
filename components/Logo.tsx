'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

type Variant = 'light' | 'dark';

interface LogoProps {
  variant?: Variant;
  showText?: boolean;
  className?: string;
  boxed?: boolean;
}

/**
 * Logo lockup matching the brand screenshot:
 *
 *   [A logo]  Anwar Khan          ← title case, bold, smaller, dark navy
 *             LEGAL CONSULTANT    ← uppercase, thin/light, larger, wide-spaced
 *
 * The monogram bottom-aligns with "LEGAL CONSULTANT".
 * The icon spans both lines of text in height.
 */
export default function Logo({
  variant = 'dark',
  showText = true,
  className = '',
  boxed = false,
}: LogoProps) {
  /* Color variants for light (over dark hero) vs dark (scrolled glass bar) */
  const nameColor = variant === 'light' ? 'text-white' : 'text-secondary';
  const subColor  = variant === 'light' ? 'text-white/80' : 'text-secondary/70';

  /* Boxed treatment — tinted square container around the monogram */
  const boxClasses = boxed
    ? variant === 'light'
      ? 'rounded-xl bg-white/[0.06] border border-white/15 p-2 md:p-2.5 w-[48px] h-[48px] md:w-[56px] md:h-[56px] flex items-center justify-center'
      : 'rounded-xl bg-primary/10 border border-primary/20 p-2 md:p-2.5 w-[48px] h-[48px] md:w-[56px] md:h-[56px] flex items-center justify-center'
    : 'w-[32px] h-[32px] md:w-[40px] md:h-[40px]';

  return (
    <div className={`flex items-center ${boxed ? 'gap-3 md:gap-4' : 'items-end gap-1'} ${className}`}>
      {/* Logo monogram */}
      <motion.div
        initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative shrink-0 ${boxClasses}`}
      >
        <Image
          src="/images/logo-a.png"
          alt="Anwar Khan Logo"
          width={1536}
          height={1024}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>

      {/* Text lockup */}
      {showText && (
        <div className={`flex flex-col ${boxed ? '' : 'pb-[1px]'}`}>
          <span
            className={
              boxed
                ? `font-display font-bold tracking-tight text-lg md:text-xl leading-tight ${nameColor}`
                : `font-display font-bold tracking-wide text-[10px] md:text-[12px] leading-none ${nameColor}`
            }
          >
            Anwar Khan
          </span>
          <span
            className={
              boxed
                ? `font-sans font-light tracking-[0.28em] uppercase text-[10px] md:text-[11px] leading-none mt-1.5 ${subColor}`
                : `font-sans font-light tracking-[0.25em] uppercase text-[11px] md:text-[14px] leading-none mt-[3px] ${subColor}`
            }
          >
            Legal Consultant
          </span>
        </div>
      )}
    </div>
  );
}
