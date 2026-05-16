"use client"

import React from "react"
import { cn } from "@/lib/utils"

type CardContent = {
  title: string
  description: string
  image?: string
}

const cardContents: CardContent[] = [
  {
    title: "Immigration Assistance",
    description:
      "Visa refusals, UK immigration cases, settlement and appeals — clear, end-to-end guidance from a consultant who has worked in this space since 2004. We prepare the strongest possible application and represent you through every stage of the Home Office or tribunal process.",
  },
  {
    title: "Wills & Estate Planning",
    description:
      "Probate, will drafting and estate administration — protect what matters most for the people who matter most.",
  },
  {
    title: "Lease & Licence",
    description:
      "Landlord-tenant disputes, lease agreements, renewals and licence assignments — practical advice for both sides of the lease.",
  },
  {
    title: "Litigation & Disputes",
    description:
      "Civil litigation, dispute resolution and mediation handled with care and commercial judgement.",
  },
  {
    title: "Civil Legal Services",
    description:
      "Comprehensive civil law advisory and representation across a wide range of personal and business matters.",
    image: "/images/services/civil-legal.png",
  },
]

const PlusCard: React.FC<{
  className?: string
  title: string
  description: string
  image?: string
}> = ({ className = "", title, description, image }) => {
  return (
    <div
      className={cn(
        "relative rounded-lg flex flex-col justify-between overflow-hidden",
        "border border-dashed border-secondary/30",
        image ? "bg-secondary p-0" : "bg-white p-6 min-h-[200px]",
        className
      )}
    >
      <CornerPlusIcons />

      {image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-[80%_center] scale-110"
        />
      ) : (
        <div className="relative z-10 space-y-2">
          <h3 className="font-display font-extrabold text-xl md:text-2xl tracking-tight leading-[1.1] text-secondary">
            {title}
          </h3>
          <p className="text-secondary/70 leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  )
}

const CornerPlusIcons = () => (
  <>
    <PlusIcon className="absolute -top-3 -left-3" />
    <PlusIcon className="absolute -top-3 -right-3" />
    <PlusIcon className="absolute -bottom-3 -left-3" />
    <PlusIcon className="absolute -bottom-3 -right-3" />
  </>
)

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1.25"
    stroke="currentColor"
    className={`text-primary size-6 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
)

export default function RuixenBentoCards() {
  return (
    <section className="bg-transparent">
      <div className="mx-auto container py-12 px-4">
        {/* Top bento — 4 text cards filling 6 cols × 3 rows cleanly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-6 md:gap-8">
          <PlusCard {...cardContents[0]} className="lg:col-span-3 lg:row-span-2" />
          <PlusCard {...cardContents[1]} className="lg:col-span-3 lg:row-span-2" />
          <PlusCard {...cardContents[2]} className="lg:col-span-4 lg:row-span-1" />
          <PlusCard {...cardContents[3]} className="lg:col-span-2 lg:row-span-1" />
        </div>

        {/* Bottom row — Civil image card (left) paired with the quote (right) */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <PlusCard
            {...cardContents[4]}
            className="aspect-[16/10] lg:aspect-[5/3]"
          />
          <div className="text-left lg:text-right">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary leading-[1.05]">
              Built on experience.{" "}
              <span className="text-primary">Tailored to you.</span>
            </h2>
            <p className="mt-5 text-secondary/70 text-base md:text-lg leading-relaxed max-w-md lg:ml-auto">
              Every matter is handled personally, with fixed, transparent fees and multilingual
              support in English and Bengali — so you always know where you stand and what comes
              next.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
