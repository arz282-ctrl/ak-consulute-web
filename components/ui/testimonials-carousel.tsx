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
  // Star fill ratio (0.92 for 4.6, 0.98 for 4.9, 1.0 for 5.0)
  const ratio = clamped / 5;
  const gradId = React.useId();
  return (
    <div
      className="flex shrink-0 items-center gap-1.5"
      aria-label={`${clamped.toFixed(1)} out of 5 stars`}
    >
      {/* Single SVG star with proportional flame fill */}
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        className="shrink-0 block"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset={`${ratio * 100}%`} stopColor="#F57C20" />
            <stop offset={`${ratio * 100}%`} stopColor="#0A1628" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <path
          d="M12 2.5l2.95 6.1 6.55.95-4.75 4.65 1.12 6.5L12 17.6l-5.87 3.1 1.12-6.5L2.5 9.55l6.55-.95L12 2.5z"
          fill={`url(#${gradId})`}
          stroke="#F57C20"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </svg>
      {/* Numeric rating */}
      <div className="font-display text-[15px] font-extrabold leading-none text-secondary tabular-nums">
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
