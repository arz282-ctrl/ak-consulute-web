"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  highlight?: string;
  image: string;
  name: string;
  role: string;
  rating?: number;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  speed?: number;
  direction?: "left" | "right";
  cardHeight?: number;
  className?: string;
}

function RatingBadge({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(5, rating));
  // Fill percentage for the star overlay (e.g. 4.7 → 94%)
  const fillPct = (clamped / 5) * 100;
  return (
    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/30">
      <div className="relative flex gap-[1px] text-[9px] leading-none" aria-label={`${clamped.toFixed(1)} out of 5 stars`}>
        {/* Empty stars (background) */}
        <div className="flex gap-[1px] text-secondary/20">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        {/* Filled stars clipped to the rating percentage */}
        <div
          className="absolute inset-0 flex gap-[1px] text-primary overflow-hidden"
          style={{ width: `${fillPct}%` }}
        >
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
      </div>
      <div className="mt-0.5 text-[9px] font-extrabold text-secondary leading-none tabular-nums">
        {clamped.toFixed(1)}
      </div>
    </div>
  );
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  speed = 20,
  direction = "left",
  cardHeight = 220,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setCarouselWidth(containerRef.current.scrollWidth / 2);
    }
  }, [testimonials]);

  const loopTestimonials = [...testimonials, ...testimonials];

  return (
    <div className={`overflow-hidden w-full ${className}`} ref={containerRef}>
      <motion.div
        animate={{
          x: direction === "left" ? [0, -carouselWidth] : [-carouselWidth, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-6"
      >
        {loopTestimonials.map(({ text, highlight, image, name, role, rating = 5 }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04, rotate: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="bg-white my-3 border border-secondary/10 rounded-3xl p-6 shadow-ink/20 hover:shadow-flame-sm transition-shadow duration-500 flex-shrink-0 w-[320px] md:w-[360px] flex flex-col justify-between"
            style={{ height: cardHeight }}
          >
            <p className="text-[14px] leading-relaxed text-secondary/85 break-words whitespace-normal overflow-hidden">
              {highlight
                ? text.split(highlight).map((part, idx, arr) => (
                    <React.Fragment key={idx}>
                      {part}
                      {idx !== arr.length - 1 && (
                        <span className="text-primary font-semibold">
                          {highlight}
                        </span>
                      )}
                    </React.Fragment>
                  ))
                : text}
            </p>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-secondary/10">
              {/* Custom rating badge — replaces the profile photo on mobile + desktop. */}
              <RatingBadge rating={rating} />
              <div className="flex flex-col">
                <div className="font-display font-bold text-secondary leading-tight">
                  {name}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-primary mt-0.5">
                  {role}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
