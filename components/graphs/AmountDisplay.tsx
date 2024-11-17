'use client';
import { GraphType } from '@/lib/types';
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  performance: GraphType[];
}

const AmountDisplay = ({ performance }: Props) => {
  const getLatestAmount = (performance: GraphType[]): number => {
    if (!performance || performance.length === 0) return 0;

    const sortedData = [...performance].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return sortedData[0].value;
  };

  const getLatestDate = (performance: GraphType[]): string => {
    if (!performance || performance.length === 0) return '';

    const sortedData = [...performance].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return new Date(sortedData[0].date).toLocaleDateString('nb-NO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const targetValue = getLatestAmount(performance);

  const maxDigits = useMemo(() => {
    return targetValue
      .toLocaleString('en-US', { maximumFractionDigits: 0 })
      .replace(/,/g, '').length;
  }, [targetValue]);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const clamped = Math.min(Math.round(latest), targetValue);
    return clamped;
  });
  const displayValue = useSpring(rounded, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.5,
  });

  const formattedDisplayValue = useTransform(displayValue, (value) =>
    value.toLocaleString('nb-NO', { maximumFractionDigits: 0 }),
  );

  useEffect(() => {
    count.set(targetValue);
  }, [targetValue, count]);

  if (!performance || performance.length === 0) return null;

  return (
    <div className="w-full my-16 max-w-2xl flex flex-col justify-center items-center mx-auto">
      <div className="p-8 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">
          Fondets totale verdi
        </h2>
        <div className="flex justify-center items-baseline">
          <motion.div
            className="text-5xl font-bold text-green-400 tabular-nums"
            style={{
              fontFamily: 'Consolas, monospace',
              width: `${maxDigits}ch`,
              textAlign: 'right',
            }}
          >
            <AnimatedNumber value={formattedDisplayValue} />
          </motion.div>
          <span className="text-5xl font-bold text-green-400 ml-2">kr</span>
        </div>
        <p className="text-gray-400 mt-2">
          Sist oppdatert {getLatestDate(performance)}
        </p>
      </div>
    </div>
  );
};

interface AnimatedNumberProps {
  value: MotionValue<string>;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    const unsubscribe = value.onChange((latest) => {
      setDisplay(latest);
    });
    return () => unsubscribe();
  }, [value]);

  return <span>{display}</span>;
};

export default AmountDisplay;
