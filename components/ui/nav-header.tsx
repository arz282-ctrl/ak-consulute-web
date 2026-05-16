"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export type NavItem = {
  label: string;
  href: string;
};

type Position = { left: number; width: number; opacity: number };

interface NavHeaderProps {
  items: NavItem[];
  className?: string;
}

function NavHeader({ items, className = "" }: NavHeaderProps) {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className={`relative mx-auto flex w-fit rounded-full border-2 border-secondary bg-white p-1 ${className}`}
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {items.map((item) => (
        <Tab key={item.href} href={item.href} setPosition={setPosition}>
          {item.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  href,
  setPosition,
}: {
  children: React.ReactNode;
  href: string;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer text-xs uppercase text-white mix-blend-difference"
    >
      <a
        href={href}
        className="block px-3 py-1 md:px-4 md:py-[5px] text-[10px] md:text-[11px] font-semibold tracking-wide"
      >
        {children}
      </a>
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="absolute z-0 h-6 rounded-full bg-secondary md:h-[27px]"
    />
  );
};

export default NavHeader;
