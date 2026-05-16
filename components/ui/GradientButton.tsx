'use client';

import { motion, type MotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'solid' | 'ghost';
  size?: 'md' | 'lg';
  withArrow?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
} & Omit<MotionProps, 'children'>;

export default function GradientButton({
  children,
  href,
  onClick,
  variant = 'solid',
  size = 'md',
  withArrow = true,
  className = '',
  type = 'button',
  disabled = false,
  ...motionProps
}: ButtonProps) {
  const sizing = size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm';

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-shadow disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group';

  const solid =
    'text-white shadow-flame-sm hover:shadow-flame bg-gradient-flame bg-[length:200%_100%]';
  const ghost =
    'text-secondary border border-secondary/15 hover:border-primary/60 bg-white/70 backdrop-blur';

  const styles = `${base} ${sizing} ${variant === 'solid' ? solid : ghost} ${className}`;

  const Inner = (
    <>
      {/* Animated sheen overlay (solid only) */}
      {variant === 'solid' && (
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.8s linear infinite',
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <motion.span
          className="relative z-10"
          initial={false}
          whileHover={{ x: 4 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      )}
    </>
  );

  const motionFx = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 380, damping: 22 },
    ...motionProps,
  } as MotionProps;

  if (href) {
    return (
      <motion.a href={href} className={styles} {...motionFx}>
        {Inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
      {...motionFx}
    >
      {Inner}
    </motion.button>
  );
}
