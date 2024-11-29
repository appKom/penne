import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IncrementingNumber } from './IncrementingNumber';

const Splash = () => {
  return (
    <div className="items-center justify-center w-full h-screen text-center p-20">
      <h1 className="text-8xl font-bold">Onlinefondet</h1>
      <h2 className="text-6xl text-center text-gray-200">
        <IncrementingNumber target={1_273_000} duration={1000} />
      </h2>
      <p className="text-gray-500">Markedsverdi pr. 23/7/2024</p>
    </div>
  );
};

export default Splash;
