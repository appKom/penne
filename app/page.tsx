'use client';

import PerformanceDisplay from '@/components/graphs/PerformanceDisplay';
import ScrollDownIcon from '@/components/home/ScrollDownIcon';
import Splash from '@/components/home/Splash';
import { homeText } from '@/lib/content';

const HomePage = () => (
  <div className="flex flex-col items-center justify-center">
    <Splash />
    <ScrollDownIcon />
    <div
      id="home-text"
      className="w-full py-16 text-lg bg-gray-950 border-y border-[#293046]"
    >
      <div className="max-w-3xl m-auto px-4">
        {homeText.map((text, index) => (
          <p key={index} className="mb-4 text-lg leading-relaxed text-gray-200">
            {text}
          </p>
        ))}
      </div>
    </div>
    <PerformanceDisplay />
  </div>
);

export default HomePage;
