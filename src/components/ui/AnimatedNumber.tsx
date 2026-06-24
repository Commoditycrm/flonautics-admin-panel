"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

// Counts up from 0 to `value` on mount / when value changes.
const AnimatedNumber = ({
  value,
  duration = 0.8,
}: {
  value: number;
  duration?: number;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    Math.round(v).toLocaleString()
  );

  useEffect(() => {
    const controls = animate(count, value || 0, {
      duration,
      ease: "easeOut",
    });
    return controls.stop;
  }, [value, duration, count]);

  return <motion.span>{rounded}</motion.span>;
};

export default AnimatedNumber;
