"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

type AnimateOnScrollProps = {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
};

export function AnimateOnScroll({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  distance = 30,
  className,
  once = true,
}: AnimateOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const initial: Record<string, number> = { opacity: 0 };

  if (direction === "up") initial.y = distance;
  if (direction === "down") initial.y = -distance;
  if (direction === "left") initial.x = -distance;
  if (direction === "right") initial.x = distance;

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

