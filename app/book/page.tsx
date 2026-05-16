'use client';

import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Paperclip,
  Trash2,
  ChevronLeft,
  MailCheck,
  CalendarClock,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WaitlistCard } from '@/components/ui/card-6';

/* ---------- data ---------- */

const SERVICES = [
  { id: 'immigration', label: 'Immigration Assistance', hint: 'Visa, settlement, appeals' },
  { id: 'family', label: 'Family Law', hint: 'Divorce, custody, maintenance' },
  { id: 'wills', label: 'Wills & Estate Planning', hint: 'Probate, will drafting' },
  { id: 'property', label: 'Property & Conveyancing', hint: 'Buy, sell, transfer' },
  { id: 'employment', label: 'Employment Issues', hint: 'Disputes, dismissal, contracts' },
  { id: 'lease', label: 'Lease & Licence', hint: 'Landlord-tenant matters' },
  { id: 'litigation', label: 'Litigation & Disputes', hint: 'Civil claims, mediation' },
  { id: 'civil', label: 'Civil Legal Services', hint: 'General civil advisory' },
] as const;

const URGENCY = [
  { id: 'low', label: 'No rush', hint: 'Within a month' },
  { id: 'med', label: 'Soon', hint: 'Within 2 weeks' },
  { id: 'high', label: 'Urgent', hint: 'Within a few days' },
  { id: 'emergency', label: 'Emergency', hint: 'Immediate / deadline' },
] as const;

const CONTACT_METHODS = [
  { id: 'phone', label: 'Phone call' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'email', label: 'Email' },
  { id: 'inperson', label: 'In person' },
] as const;

const LANGUAGES = ['English', 'Bengali', 'Hindi', 'Urdu', 'Polish'] as const;

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', hint: '9 am – 12 pm' },
  { id: 'afternoon', label: 'Afternoon', hint: '12 – 4 pm' },
  { id: 'evening', label: 'Evening', hint: '4 – 7 pm' },
  { id: 'flexible', label: 'Flexible', hint: 'Anytime' },
] as const;

/* ---------- types ---------- */

type FormState = {
  service: string;
  fullName: string;
  email: string;
  phone: string;
  language: string;
  contactMethod: string;
  preferredDate: string;
  preferredSlot: string;
  caseSummary: string;
  urgency: string;
  priorAction: 'yes' | 'no' | '';
  documents: { id: string; file: File; label: string }[];
  consent: boolean;
};

const INITIAL: FormState = {
  service: '',
  fullName: '',
  email: '',
  phone: '',
  language: 'English',
  contactMethod: '',
  preferredDate: '',
  preferredSlot: '',
  caseSummary: '',
  urgency: '',
  priorAction: '',
  documents: [],
  consent: false,
};

const STEPS = ['Service', 'Personal', 'Case', 'Documents', 'Review'] as const;

/* ---------- page ---------- */

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL);

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const canAdvance = (() => {
    if (step === 0) return form.service !== '';
    if (step === 1) return form.fullName.trim() && form.email.trim() && form.phone.trim() && form.contactMethod;
    if (step === 2) return form.caseSummary.trim().length >= 10 && form.urgency;
    if (step === 3) return true; // documents optional
    if (step === 4) return form.consent;
    return false;
  })();

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = () => {
    const lines = [
      'NEW CONSULTATION REQUEST',
      '========================',
      '',
      `Service: ${SERVICES.find((s) => s.id === form.service)?.label ?? '-'}`,
      '',
      `Name: ${form.fullName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Preferred language: ${form.language}`,
      `Preferred contact: ${CONTACT_METHODS.find((c) => c.id === form.contactMethod)?.label ?? '-'}`,
      `Preferred date: ${form.preferredDate || '-'}`,
      `Preferred slot: ${TIME_SLOTS.find((t) => t.id === form.preferredSlot)?.label ?? '-'}`,
      '',
      `Urgency: ${URGENCY.find((u) => u.id === form.urgency)?.label ?? '-'}`,
      `Prior legal action: ${form.priorAction || '-'}`,
      '',
      'Case summary:',
      form.caseSummary,
      '',
      `Attachments mentioned (${form.documents.length}):`,
      ...form.documents.map((d, i) => `  ${i + 1}. ${d.label || 'Untitled'} — ${d.file.name} (${(d.file.size / 1024).toFixed(0)} KB)`),
    ].join('\n');

    const subject = encodeURIComponent(`New consultation: ${form.fullName} — ${SERVICES.find((s) => s.id === form.service)?.label ?? ''}`);
    const body = encodeURIComponent(lines);
    window.location.href = `mailto:info@akconsultant.uk?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white via-primary/[0.04] to-white flex flex-col items-center justify-center p-5 sm:p-10">
        <WaitlistCard
          icon={<MailCheck className="h-8 w-8" />}
          title="Consultation request sent."
          description="Thanks — your details have been forwarded to Anwar Khan. Expect a reply within one business day. For urgent matters, please call directly."
          footerContent={
            <div className="flex flex-col items-center gap-3">
              <a
                href="tel:+447459641859"
                className="text-sm font-bold text-primary hover:underline underline-offset-4"
              >
                Or call +44 7459 641859
              </a>
              <Link href="/" className="text-xs text-secondary/60 hover:text-secondary underline-offset-4 hover:underline">
                Back to home
              </Link>
            </div>
          }
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 w-[480px] h-[480px] bg-primary/[0.08] rounded-full blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute top-1/3 -left-40 w-[420px] h-[420px] bg-secondary/[0.05] rounded-full blur-[110px]" />

      <div className="relative max-w-md mx-auto min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-md border-b border-secondary/10 px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-secondary/70 hover:text-secondary"
            aria-label="Back to homepage"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-primary">
            Book consultation
          </div>
          <Link
            href="/"
            className="text-secondary/40 hover:text-secondary"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </Link>
        </header>

        {/* Progress */}
        <div className="px-5 pt-5">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary/55 mb-2">
            <span>
              Step {step + 1} of {STEPS.length}
            </span>
            <span className="text-secondary">{STEPS[step]}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-secondary/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-flame rounded-full"
              initial={false}
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Step body */}
        <div className="flex-1 px-5 pt-6 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {step === 0 && <StepService form={form} update={update} />}
              {step === 1 && <StepPersonal form={form} update={update} />}
              {step === 2 && <StepCase form={form} update={update} />}
              {step === 3 && <StepDocuments form={form} update={update} />}
              {step === 4 && <StepReview form={form} update={update} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sticky bottom nav */}
        <div className="fixed bottom-0 inset-x-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-secondary/10 px-5 py-4">
          <div className="flex items-center gap-3">
            {step > 0 && (
              <button
                onClick={back}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary/20 px-5 py-3 text-sm font-semibold text-secondary hover:bg-secondary/5"
                aria-label="Previous step"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                disabled={!canAdvance}
                className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-flame transition-all hover:brightness-105 disabled:bg-secondary/20 disabled:shadow-none disabled:text-secondary/40 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canAdvance}
                className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-flame transition-all hover:brightness-105 disabled:bg-secondary/20 disabled:shadow-none disabled:text-secondary/40 disabled:cursor-not-allowed"
              >
                Submit Request
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- step components ---------- */

function StepHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display font-extrabold text-[24px] leading-tight text-secondary tracking-tight">
        {title}
      </h1>
      <p className="mt-2 text-sm text-secondary/65 leading-relaxed">{sub}</p>
    </div>
  );
}

function StepService({ form, update }: { form: FormState; update: <K extends keyof FormState>(k: K, v: FormState[K]) => void }) {
  return (
    <>
      <StepHeader title="What matter brings you here?" sub="Pick the area closest to your situation — you can add details next." />
      <div className="space-y-2">
        {SERVICES.map((s) => {
          const active = form.service === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => update('service', s.id)}
              className={`w-full flex items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-all active:scale-[0.98] ${
                active
                  ? 'border-primary bg-primary/[0.06]'
                  : 'border-secondary/10 hover:border-secondary/30 bg-white'
              }`}
            >
              <div>
                <div className={`font-display font-bold text-[15px] ${active ? 'text-secondary' : 'text-secondary'}`}>{s.label}</div>
                <div className="text-[12px] text-secondary/60 mt-0.5">{s.hint}</div>
              </div>
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  active ? 'bg-primary border-primary text-white' : 'border-secondary/25 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function StepPersonal({ form, update }: { form: FormState; update: <K extends keyof FormState>(k: K, v: FormState[K]) => void }) {
  return (
    <>
      <StepHeader title="Tell me about yourself" sub="So I can prepare the right next steps and contact you." />
      <div className="space-y-4">
        <FieldText label="Full name" value={form.fullName} onChange={(v) => update('fullName', v)} placeholder="Jane Doe" required />
        <FieldText label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} placeholder="jane@example.com" required />
        <FieldText label="Phone" type="tel" value={form.phone} onChange={(v) => update('phone', v)} placeholder="+44 7…" required />

        <div>
          <Label>Preferred language</Label>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => {
              const active = form.language === l;
              return (
                <button
                  type="button"
                  key={l}
                  onClick={() => update('language', l)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold border-2 transition-colors ${
                    active ? 'border-primary bg-primary text-white' : 'border-secondary/15 bg-white text-secondary hover:border-secondary/30'
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label>How should I reach you?</Label>
          <div className="grid grid-cols-2 gap-2">
            {CONTACT_METHODS.map((c) => {
              const active = form.contactMethod === c.id;
              return (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => update('contactMethod', c.id)}
                  className={`px-3 py-3 rounded-xl text-[13px] font-semibold border-2 transition-all active:scale-[0.97] ${
                    active ? 'border-primary bg-primary/[0.06] text-secondary' : 'border-secondary/10 bg-white text-secondary/70 hover:border-secondary/25'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label>Preferred consultation date (optional)</Label>
          <input
            type="date"
            value={form.preferredDate}
            onChange={(e) => update('preferredDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-xl border-2 border-secondary/10 bg-white text-[14px] text-secondary focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition"
          />
        </div>

        <div>
          <Label>Best time of day (optional)</Label>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((t) => {
              const active = form.preferredSlot === t.id;
              return (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => update('preferredSlot', t.id)}
                  className={`px-3 py-3 rounded-xl text-left border-2 transition-all active:scale-[0.97] ${
                    active ? 'border-primary bg-primary/[0.06]' : 'border-secondary/10 bg-white hover:border-secondary/25'
                  }`}
                >
                  <div className="text-[13px] font-semibold text-secondary flex items-center gap-1.5">
                    <CalendarClock className="w-3.5 h-3.5 text-primary" />
                    {t.label}
                  </div>
                  <div className="text-[11px] text-secondary/55 mt-0.5">{t.hint}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function StepCase({ form, update }: { form: FormState; update: <K extends keyof FormState>(k: K, v: FormState[K]) => void }) {
  return (
    <>
      <StepHeader title="About your case" sub="A short summary helps me prepare. Don't worry about legal language — plain words are fine." />
      <div className="space-y-5">
        <div>
          <Label>Describe your situation</Label>
          <textarea
            value={form.caseSummary}
            onChange={(e) => update('caseSummary', e.target.value)}
            rows={6}
            placeholder="e.g. My spouse visa was refused last week. The refusal letter cites financial requirement…"
            className="w-full px-4 py-3 rounded-xl border-2 border-secondary/10 bg-white text-[14px] text-secondary placeholder:text-secondary/35 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition resize-none leading-relaxed"
          />
          <div className="mt-1.5 text-[11px] text-secondary/50 text-right">
            {form.caseSummary.length} chars · min 10
          </div>
        </div>

        <div>
          <Label>How urgent is it?</Label>
          <div className="grid grid-cols-2 gap-2">
            {URGENCY.map((u) => {
              const active = form.urgency === u.id;
              return (
                <button
                  type="button"
                  key={u.id}
                  onClick={() => update('urgency', u.id)}
                  className={`px-3 py-3 rounded-xl text-left border-2 transition-all active:scale-[0.97] ${
                    active ? 'border-primary bg-primary/[0.06]' : 'border-secondary/10 bg-white hover:border-secondary/25'
                  }`}
                >
                  <div className="text-[13px] font-bold text-secondary">{u.label}</div>
                  <div className="text-[11px] text-secondary/55 mt-0.5">{u.hint}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label>Have you already taken legal action on this?</Label>
          <div className="grid grid-cols-2 gap-2">
            {(['yes', 'no'] as const).map((v) => {
              const active = form.priorAction === v;
              return (
                <button
                  type="button"
                  key={v}
                  onClick={() => update('priorAction', v)}
                  className={`px-3 py-3 rounded-xl text-[13px] font-semibold border-2 transition-all active:scale-[0.97] ${
                    active ? 'border-primary bg-primary/[0.06] text-secondary' : 'border-secondary/10 bg-white text-secondary/70 hover:border-secondary/25'
                  }`}
                >
                  {v === 'yes' ? 'Yes — I have' : 'Not yet'}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function StepDocuments({ form, update }: { form: FormState; update: <K extends keyof FormState>(k: K, v: FormState[K]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const added = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      file,
      label: '',
    }));
    update('documents', [...form.documents, ...added]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const updateLabel = (id: string, label: string) => {
    update(
      'documents',
      form.documents.map((d) => (d.id === id ? { ...d, label } : d)),
    );
  };

  const remove = (id: string) => {
    update('documents', form.documents.filter((d) => d.id !== id));
  };

  return (
    <>
      <StepHeader
        title="Any documents to share?"
        sub="Optional but helpful — passport, refusal letters, contracts, court papers, screenshots. Label each so I know what it is."
      />
      <div className="space-y-4">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,application/pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/[0.03] px-4 py-6 text-center hover:bg-primary/[0.06] active:scale-[0.99]"
        >
          <Paperclip className="w-6 h-6 text-primary" />
          <div className="font-display font-bold text-[14px] text-secondary">Attach documents</div>
          <div className="text-[11px] text-secondary/55">
            PDF, JPG, PNG, DOC — up to multiple files
          </div>
        </button>

        {form.documents.length === 0 ? (
          <p className="text-[12px] text-secondary/55 text-center pt-2">
            No documents attached yet — you can also skip this step.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {form.documents.map((doc) => (
              <li
                key={doc.id}
                className="rounded-2xl border border-secondary/10 bg-white p-3"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-bold text-secondary truncate">{doc.file.name}</div>
                    <div className="text-[10px] text-secondary/55">{(doc.file.size / 1024).toFixed(0)} KB</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(doc.id)}
                    className="p-1.5 rounded-full text-secondary/50 hover:bg-red-50 hover:text-red-500"
                    aria-label="Remove document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  value={doc.label}
                  onChange={(e) => updateLabel(doc.id, e.target.value)}
                  placeholder="What is this? (e.g. Refusal letter)"
                  className="w-full px-3 py-2 rounded-lg border border-secondary/15 bg-white text-[12px] text-secondary placeholder:text-secondary/40 focus:border-primary outline-none"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function StepReview({ form, update }: { form: FormState; update: <K extends keyof FormState>(k: K, v: FormState[K]) => void }) {
  const rows: { label: string; value: string }[] = [
    { label: 'Service', value: SERVICES.find((s) => s.id === form.service)?.label ?? '—' },
    { label: 'Full name', value: form.fullName },
    { label: 'Email', value: form.email },
    { label: 'Phone', value: form.phone },
    { label: 'Language', value: form.language },
    {
      label: 'Contact via',
      value: CONTACT_METHODS.find((c) => c.id === form.contactMethod)?.label ?? '—',
    },
    {
      label: 'Date',
      value: form.preferredDate || '—',
    },
    {
      label: 'Time slot',
      value: TIME_SLOTS.find((t) => t.id === form.preferredSlot)?.label ?? '—',
    },
    {
      label: 'Urgency',
      value: URGENCY.find((u) => u.id === form.urgency)?.label ?? '—',
    },
    { label: 'Prior action', value: form.priorAction || '—' },
    { label: 'Documents', value: `${form.documents.length} attached` },
  ];

  return (
    <>
      <StepHeader title="Review & submit" sub="Double-check your details. Hit submit and I'll get back within one business day." />
      <div className="rounded-2xl border border-secondary/10 bg-white divide-y divide-secondary/10 mb-5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start gap-3 px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-secondary/55 w-24 shrink-0 mt-0.5">
              {r.label}
            </div>
            <div className="text-[13px] text-secondary font-medium flex-1 break-words">
              {r.value || '—'}
            </div>
          </div>
        ))}
        {form.caseSummary && (
          <div className="px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-secondary/55 mb-1.5">
              Case summary
            </div>
            <p className="text-[13px] text-secondary leading-relaxed whitespace-pre-wrap">
              {form.caseSummary}
            </p>
          </div>
        )}
      </div>

      <label className="flex items-start gap-3 px-1 cursor-pointer">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update('consent', e.target.checked)}
          className="mt-1 w-5 h-5 rounded border-secondary/30 text-primary focus:ring-primary"
        />
        <span className="text-[12px] text-secondary/75 leading-relaxed">
          I agree that my details may be used to respond to this enquiry. I understand fees are
          discussed before any work begins, and that no solicitor-client relationship is created
          until both parties sign a written engagement.
        </span>
      </label>
    </>
  );
}

/* ---------- field primitives ---------- */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-secondary/70 mb-2">
      {children}
    </div>
  );
}

function FieldText({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>
        {label}
        {required && <span className="text-primary"> *</span>}
      </Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border-2 border-secondary/10 bg-white text-[14px] text-secondary placeholder:text-secondary/35 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition"
      />
    </div>
  );
}
