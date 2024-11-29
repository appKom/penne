'use client';

import React, { useEffect, useState } from 'react';

export const IncrementingNumber = ({
  target,
  duration,
}: {
  target: number;
  duration: number;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      const progressValue = Math.min(elapsed / duration, 1);
      setProgress(progressValue);

      if (progressValue < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [duration]);

  const current = Math.floor(Math.pow(progress, 2) * target);

  return <>{current.toLocaleString()} kr</>;
};
