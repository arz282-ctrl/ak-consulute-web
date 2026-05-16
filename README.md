# Anwar Khan — Legal Consultant

A production-ready Next.js 14 portfolio website for **Anwar Khan**, a UK-based legal consultant and immigration expert in practice since 2004.

Built with: Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide Icons · Google Fonts (Inter + Sora).

---

## Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build && npm start
```

Open http://localhost:3000

---

## Project Structure

```
.
├── app/
│   ├── layout.tsx        # Root layout + Google fonts + metadata
│   ├── page.tsx          # Composes all sections
│   └── globals.css       # Tailwind + global styles + utilities
├── components/
│   ├── Navigation.tsx    # Glassmorphism sticky nav + scroll progress
│   ├── Hero.tsx          # Animated gradient + word-by-word reveal
│   ├── About.tsx         # Conic-ring portrait + animated counters
│   ├── Services.tsx      # 8 services, staggered card grid
│   ├── WhyChooseUs.tsx   # Parallax dark section + USP pills
│   ├── Testimonials.tsx  # Infinite horizontal marquee
│   ├── Contact.tsx       # Two-column form + animated submit
│   ├── Footer.tsx        # Brand, links, socials
│   ├── Logo.tsx          # Inline SVG logomark (A + upward swoosh)
│   └── ui/
│       ├── AnimatedCounter.tsx
│       ├── FloatingShapes.tsx
│       └── GradientButton.tsx
├── lib/
│   └── animations.ts     # Framer Motion variants
├── public/
│   └── images/
│       ├── logo.png         # Replace with final logo if needed
│       ├── anwar-khan.jpg   # Replace with the real portrait
│       └── story.png
└── tailwind.config.ts    # Brand colors + custom keyframes
```

## Brand System

| Token        | Value     |
|--------------|-----------|
| `primary`    | `#F57C20` (Flame Orange) |
| `secondary`  | `#0A1628` (Deep Navy)    |
| Paper        | `#FFFFFF`                |
| Display font | Sora (extrabold)         |
| Body font    | Inter                    |

The "A" monogram's upward swoosh is the brand's signature motif — used in the inline logo, dividers, and decorative SVG flourishes throughout the page.

## Replacing the placeholder photo

Drop the official headshot at:

```
public/images/anwar-khan.jpg   (square 800×800 recommended)
```

It is referenced from `components/About.tsx`.

## Form Integration

`components/Contact.tsx` currently simulates submission. To wire it up:

- **Formspree** — replace `onSubmit` with a `fetch('https://formspree.io/f/XXXX', ...)`
- **Resend / API route** — create `app/api/contact/route.ts` and POST to it
- **EmailJS** — replace handler with `emailjs.sendForm(...)`

## Motion Notes

- All animations use `transform` & `opacity` (GPU-accelerated)
- Section reveals use `useInView` with `once: true` and `-80px` margin
- Hero gradient + parallax `Why Choose Us` background use `useScroll`/`useTransform`
- Hover lifts use spring physics for natural feel
- Marquee is a duplicated array with `x: 0% → -50%` linear loop

## License

MIT
