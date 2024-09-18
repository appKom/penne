'use client';

/* import PerformanceDisplay from '@/components/graphs/PerformanceDisplay';
import PieChart from '@/components/graphs/PieChart';
import Table from '@/components/graphs/Table'; */
import ScrollDownIcon from '@/components/home/ScrollDownIcon';
import Splash from '@/components/home/Splash';
import { homeText } from '@/lib/content';
import { store } from '@/lib/services/Store';
import { Provider } from 'react-redux';

const HomePage = () => (
  <Provider store={store}>
    <div className="flex flex-col items-center justify-center h-full">
      <Splash />
      <ScrollDownIcon />
      <div
        id="home-text"
        className="w-full py-16 text-lg bg-gray-950 border-y border-[#293046]"
      >
        <div className="max-w-3xl m-auto px-4">
          {homeText.map((text, index) => (
            <p
              key={index}
              className="mb-4 text-lg leading-relaxed text-gray-200"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
      {<div className="my-64">Her kommer det straks grafer :)</div>}
      {/* <PerformanceDisplay />
      <div className="hidden w-full mb-10 md:block">
        <div className="w-full mt-40 mb-10 text-lg text-center">
          Denne smultringen gir en oversikt over fondets sammensetning (FAKE
          DATA)
        </div>
        <PieChart />
      </div>
      <div className="w-3/4 mt-40">
        <div className="mb-10 text-lg text-center">
          Tabellen viser fond, andel og kategori (FAKE DATA)
        </div>
        <Table />
      </div> */}
    </div>
  </Provider>
);

export default HomePage;
