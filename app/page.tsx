'use client';

import PerformanceDisplay from '@/components/graphs/PerformanceDisplay';
/* import PerformanceDisplay from '@/components/graphs/PerformanceDisplay';
import PieChart from '@/components/graphs/PieChart';
import Table from '@/components/graphs/Table'; */
import ScrollDownIcon from '@/components/home/ScrollDownIcon';
import Splash from '@/components/home/Splash';
import { homeText } from '@/lib/content';
import { store } from '@/lib/services/Store';
import { PieChart, Table } from 'lucide-react';
import { Provider } from 'react-redux';

//Test

const HomePage = () => (
  <Provider store={store}>
    <div className="flex flex-col items-center justify-center h-full">
      <div className="hidden md:block">
        <Splash />
        <ScrollDownIcon />
      </div>
      <h1 className="my-4 mt-10 text-2xl md:hidden">Online Fondet</h1>
      <div id="home-text" className="w-3/4 py-20 text-lg text-justify">
        {homeText}
      </div>
      {<div className="mb-20">Her kommer det straks grafer :)</div>}
      <PerformanceDisplay />
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
      </div>
    </div>
  </Provider>
);

export default HomePage;
