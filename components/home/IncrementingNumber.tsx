'use client';

import React, { useEffect, useState } from 'react';

export const IncrementingNumber = ({
  target,
  duration,
  delay,
}: {
  target: number;
  duration: number;
  delay: number;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let start: number | null = null;

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;

        const progressValue = Math.min(elapsed / duration, 1); // Clamp progress to [0, 1]
        setProgress(progressValue);

        if (progressValue < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delay);
  }, [duration]);

  const current = Math.floor(Math.pow(progress, 2) * target);

  return <>{current.toLocaleString('nb-NO').replace(/\s/g, '.')} kr</>;
};
