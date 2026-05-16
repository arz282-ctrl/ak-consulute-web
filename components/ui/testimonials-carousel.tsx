"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  highlight?: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  speed?: number;
  direction?: "left" | "right";
  cardHeight?: number;
  className?: string;
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
        {loopTestimonials.map(({ text, highlight, image, name, role }, index) => (
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/30"
              />
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
