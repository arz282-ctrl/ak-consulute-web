'use client';

import { motion } from 'framer-motion';

/**
 * Decorative animated geometric shapes for the hero.
 * GPU-accelerated (transform/opacity only), pointer-events disabled.
 * The "swoosh" SVG echoes the brand logo's upward flourish.
 */
export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none gpu" aria-hidden>
      {/* Ambient orbs */}
      <motion.div
        className="orb"
        style={{ width: 520, height: 520, top: '-10%', left: '-8%', background: 'radial-gradient(circle, #F57C20 0%, transparent 60%)' }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb"
        style={{ width: 460, height: 460, bottom: '-12%', right: '-6%', background: 'radial-gradient(circle, #1E3358 0%, transparent 65%)' }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Triangle */}
      <motion.svg
        className="absolute top-[18%] right-[12%]"
        width="90" height="90" viewBox="0 0 90 90"
        animate={{ y: [0, -22, 0], rotate: [0, 14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <polygon points="45,8 82,78 8,78" fill="none" stroke="#F57C20" strokeWidth="2" opacity="0.55" />
      </motion.svg>

      {/* Ring */}
      <motion.div
        className="absolute top-[60%] left-[8%] w-24 h-24 rounded-full border-2 border-primary/40"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Square (tilted) */}
      <motion.div
        className="absolute top-[28%] left-[14%] w-16 h-16 border-2 border-white/30"
        style={{ rotate: 45 }}
        animate={{ y: [0, 24, 0], rotate: [45, 65, 45] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Signature swoosh — the logo's DNA */}
      <motion.svg
        className="absolute bottom-[22%] right-[18%]"
        width="180" height="80" viewBox="0 0 180 80"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.45 }}
        transition={{ duration: 2.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.path
          d="M5 70 Q60 55 95 35 T175 5"
          stroke="#F57C20"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </motion.svg>

      {/* Tiny dots field */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
          style={{
            top: `${(i * 137) % 90 + 5}%`,
            left: `${(i * 73) % 90 + 5}%`,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 3 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}
