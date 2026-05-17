'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Globe,
  Clock,
  Loader2,
  CheckCircle2,
  Mail,
  MailCheck,
} from 'lucide-react';
import GradientButton from './ui/GradientButton';
import { slideInLeft, slideInRight, staggerContainer, fadeUp } from '@/lib/animations';
import { WaitlistCard } from './ui/card-6';
import { Button } from './ui/button';

type ContactItem = {
  icon: typeof MapPin;
  label: string;
  lines: { value: string; href: string; subIcon?: typeof Phone }[];
};

const contactItems: ContactItem[] = [
  {
    icon: MapPin,
    label: 'Office',
    lines: [
      {
        value: '432 Green Street, London, E13 9JJ',
        href: 'https://maps.google.com/?q=432+Green+Street+London+E13+9JJ',
      },
    ],
  },
  {
    icon: Phone,
    label: 'Call',
    lines: [
      { value: '+44 7459 641859', href: 'tel:+447459641859' },
    ],
  },
  {
    icon: Mail,
    label: 'Email',
    lines: [
      { value: 'info@akconsultant.uk', href: 'mailto:info@akconsultant.uk' },
    ],
  },
  {
    icon: Globe,
    label: 'Website',
    lines: [{ value: 'akconsultant.uk', href: 'https://akconsultant.uk' }],
  },
];

const serviceOptions = [
  'Immigration Assistance',
  'Family Law',
  'Wills & Estate Planning',
  'Property & Conveyancing',
  'Employment Issues',
  'Lease & Licence',
  'Litigation & Disputes',
  'Civil Legal Services',
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const name = (data.get('name') as string)?.trim() ?? '';
    const email = (data.get('email') as string)?.trim() ?? '';
    const phone = (data.get('phone') as string)?.trim() ?? '';
    const service = (data.get('service') as string)?.trim() ?? '';
    const preferredDate = (data.get('preferredDate') as string)?.trim() ?? '';
    const message = (data.get('message') as string)?.trim() ?? '';

    const lines = [
      `*New enquiry from ${name || 'Website visitor'}*`,
      '',
      `*Name:* ${name || '-'}`,
      `*Email:* ${email || '-'}`,
      `*Phone:* ${phone || '-'}`,
      `*Service:* ${service || '-'}`,
      `*Preferred date:* ${preferredDate || '-'}`,
      '',
      '*Message:*',
      message || '-',
    ].join('\n');

    const text = encodeURIComponent(lines);
    window.open(`https://wa.me/447459641859?text=${text}`, '_blank');
    setStatus('success');
    form.reset();
  }

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32 bg-gradient-to-b from-white to-primary/[0.04] overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] bg-primary/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="inline-block text-xs uppercase tracking-widest-plus font-semibold text-primary">
            Get In Touch
          </span>
          <h2 className="mt-3 font-display font-extrabold text-secondary text-4xl md:text-5xl leading-[1.05]">
            Let&rsquo;s discuss <span className="text-primary">your case</span>.
          </h2>
          <p className="mt-5 text-secondary/70 leading-relaxed">
            Risk-free evaluation. Transparent fixed fees. Always open for those who need us.
          </p>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-5 gap-8">
          {/* Contact details card */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="lg:col-span-2 relative p-8 rounded-3xl bg-secondary text-white overflow-hidden shadow-ink"
          >
            <div className="absolute inset-0 bg-gradient-ink bg-[length:200%_200%] animate-gradient-shift opacity-90" />
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute inset-0 grid-bg opacity-15" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-semibold uppercase tracking-widest">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping" />
                  <span className="relative rounded-full w-2 h-2 bg-primary" />
                </span>
                <Clock className="w-3.5 h-3.5" />
                Always Open
              </div>

              <h3 className="mt-6 font-display font-extrabold text-3xl leading-tight">
                Visit, call or<br />message anytime.
              </h3>

              <motion.ul
                variants={staggerContainer(0.1, 0.2)}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                className="mt-8 space-y-5"
              >
                {contactItems.map((c) => (
                  <motion.li key={c.label} variants={fadeUp} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-white/10 group-hover:bg-primary transition-colors flex items-center justify-center shrink-0">
                      <c.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-widest text-white/55">
                        {c.label}
                      </div>
                      <div className="mt-0.5 space-y-0.5">
                        {c.lines.map((line) => (
                          <a
                            key={line.href}
                            href={line.href}
                            target={line.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 font-semibold text-white hover:text-primary transition-colors"
                          >
                            {line.subIcon && <line.subIcon className="w-3.5 h-3.5 text-primary/80 shrink-0" />}
                            <span className="truncate">{line.value}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Languages note */}
              <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/55 uppercase tracking-widest">
                Multilingual · <span className="text-primary">English · Bengali · Hindi · Urdu · Polish</span>
              </div>
            </div>
          </motion.div>

          {/* Form / Success card — swap on submission */}
          <div className="lg:col-span-3 relative">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  className="p-2 md:p-6 flex items-center justify-center min-h-[420px]"
                >
                  <WaitlistCard
                    icon={<MailCheck className="h-8 w-8" />}
                    title="Inquiry submitted."
                    description="Thanks for reaching out. Anwar Khan will reply within one business day. For urgent matters, please call directly."
                    footerContent={
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setStatus('idle')}
                        >
                          Send another enquiry
                        </Button>
                        <a
                          href="tel:+447459641859"
                          className="text-sm font-semibold text-primary hover:underline underline-offset-4"
                        >
                          Or call +44 7459 641859
                        </a>
                      </div>
                    }
                  />
                </motion.div>
              ) : (
          <motion.form
            key="form"
            variants={slideInRight}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            exit={{ opacity: 0, y: -12 }}
            onSubmit={onSubmit}
            className="p-8 rounded-3xl bg-white border border-secondary/10 shadow-flame-sm"
          >
            <h3 className="font-display font-extrabold text-secondary text-2xl">
              Send an enquiry
            </h3>
            <p className="mt-1 text-sm text-secondary/60">
              Fill in the form and we will get back within one business day.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Field label="Full name" name="name" placeholder="Jane Doe" required />
              <Field label="Email" name="email" type="email" placeholder="jane@example.com" required />
              <Field label="Phone" name="phone" type="tel" placeholder="+44 ..." />
              <SelectField label="Service" name="service" options={serviceOptions} />
              <Field label="Preferred Date for Callback" name="preferredDate" type="date" />
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold uppercase tracking-widest text-secondary/70 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about your case…"
                className="w-full px-4 py-3 rounded-xl border border-secondary/15 bg-white text-secondary placeholder:text-secondary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
                required
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-secondary/55">
                By submitting, you agree to our terms. We never share your details.
              </p>

              <GradientButton
                type="submit"
                size="lg"
                disabled={status !== 'idle'}
                withArrow={false}
                className="min-w-[180px]"
              >
                {status === 'idle' && (
                  <>
                    Send via WhatsApp <MessageCircle className="w-4 h-4 ml-1" />
                  </>
                )}
                {status === 'loading' && (
                  <>
                    Opening… <Loader2 className="w-4 h-4 ml-1 animate-spin" />
                  </>
                )}
              </GradientButton>
            </div>
          </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-secondary/70 mb-2">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-secondary/15 bg-white text-secondary placeholder:text-secondary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-secondary/70 mb-2">
        {label}
      </label>
      <select
        name={name}
        defaultValue=""
        className="w-full px-4 py-3 rounded-xl border border-secondary/15 bg-white text-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition appearance-none"
      >
        <option value="" disabled>
          Select a service…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
