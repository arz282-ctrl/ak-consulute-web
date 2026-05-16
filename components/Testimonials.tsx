'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import {
  TestimonialsCarousel,
  type Testimonial,
} from './ui/testimonials-carousel';

const testimonials: Testimonial[] = [
  {
    text: "After two visa refusals, Anwar took the time to truly understand our situation. The application succeeded — and the fixed-fee structure meant no surprises. Honest, patient, professional.",
    highlight: 'fixed-fee structure',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    name: 'Rashida Begum',
    role: 'Immigration Client',
  },
  {
    text: "Walked us through every page of the conveyancing process. The transparency made what felt overwhelming feel completely manageable. Highly recommend to any first-time buyer.",
    highlight: 'every page of the conveyancing process',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: "James O'Connell",
    role: 'First-time Homebuyer',
  },
  {
    text: 'Being able to discuss sensitive matters in Bengali made all the difference. Anwar handled our case with respect, discretion, and remarkable care. Forever grateful.',
    highlight: 'discuss sensitive matters in Bengali',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Tahmina Akter',
    role: 'Family Law Matter',
  },
  {
    text: 'A landlord-tenant dispute that dragged on for months was resolved in weeks once Anwar got involved. Calm, decisive, and effective. Worth every penny.',
    highlight: 'resolved in weeks',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    name: 'David Whitmore',
    role: 'Lease Dispute',
  },
  {
    text: 'He drafted our family will with such care, explaining every clause. We finally feel at peace knowing our affairs are properly arranged.',
    highlight: 'explaining every clause',
    image: 'https://randomuser.me/api/portraits/women/72.jpg',
    name: 'Nasreen Choudhury',
    role: 'Wills & Probate',
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[640px] bg-primary/[0.06] rounded-full blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-1/4 -left-32 w-[440px] h-[440px] bg-secondary/[0.06] rounded-full blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 -right-32 w-[460px] h-[460px] bg-primary/[0.07] rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="inline-block text-xs uppercase tracking-widest-plus font-semibold text-primary">
            Social Proof
          </span>
          <h2 className="mt-3 font-display font-extrabold text-secondary text-4xl md:text-5xl leading-[1.05]">
            What Our <span className="text-primary">Clients</span> Say
          </h2>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-white text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Authorized &amp; Regulated · Verified Reviews
          </div>
        </motion.div>
      </div>

      {/* Two-row dual-direction carousel */}
      <div className="relative mt-14 space-y-2">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />

        <TestimonialsCarousel
          testimonials={testimonials}
          speed={32}
          direction="left"
          cardHeight={220}
        />
        <TestimonialsCarousel
          testimonials={testimonials}
          speed={40}
          direction="right"
          cardHeight={220}
        />
      </div>
    </section>
  );
}
