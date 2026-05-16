'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface WaitlistCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
  footerContent?: React.ReactNode;
}

const WaitlistCard = React.forwardRef<HTMLDivElement, WaitlistCardProps>(
  ({ className, icon, title, description, footerContent, ...props }, ref) => {
    const titleId = React.useId();

    const containerVariants = {
      hidden: { opacity: 0, scale: 0.96 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          staggerChildren: 0.12,
        },
      },
      exit: { opacity: 0, scale: 0.96, transition: { duration: 0.3 } },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: 'easeOut' as const,
        },
      },
    };

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        ref={ref}
      >
        <Card
          className={cn(
            'w-full max-w-md mx-auto text-center rounded-3xl border-secondary/10 shadow-flame-sm',
            className,
          )}
          role="region"
          aria-labelledby={titleId}
          {...props}
        >
          <CardHeader className="items-center pt-10">
            <motion.div variants={itemVariants}>
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                {icon}
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardTitle id={titleId} className="text-2xl md:text-3xl">
                {title}
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div variants={itemVariants}>
              <CardDescription className="text-base">
                {description}
              </CardDescription>
            </motion.div>
          </CardContent>
          {footerContent && (
            <CardFooter className="flex justify-center pt-2 pb-8">
              <motion.div variants={itemVariants}>{footerContent}</motion.div>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    );
  },
);

WaitlistCard.displayName = 'WaitlistCard';

export { WaitlistCard };
