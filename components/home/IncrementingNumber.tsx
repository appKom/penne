"use client";

import React, { useEffect, useState } from 'react';

export const IncrementingNumber = ({ target, duration }: { target: number; duration: number }) => {
  const [progress, setProgress] = useState(0);

  const framesPerSecond = 60;
  const nSteps = Math.floor(duration / (1000 / framesPerSecond));

  useEffect(() => {
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      setProgress(Math.min(frame, nSteps));
      if (frame >= nSteps) {
        clearInterval(interval);
      }
    }, 1000 / framesPerSecond);

    return () => clearInterval(interval);
  }, []);

  const current = Math.floor(Math.pow(progress / nSteps, 2) * target);

  return <>{current.toLocaleString()} kr</>;
}