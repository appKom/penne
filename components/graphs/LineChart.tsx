'use client';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { GraphType } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const timeRanges = {
  uke: 7,
  måned: 30,
  '3 måneder': 90,
  '6 måneder': 180,
  år: 365,
  '3 år': 365 * 3,
  '5 år': 365 * 5,
};

interface Props {
  performance: GraphType[];
}

const LineChart = ({ performance }: Props) => {
  const [selectedRange, setSelectedRange] =
    useState<keyof typeof timeRanges>('år');

  const filterDataByRange = (rangeDays: number) => {
    const today = new Date();
    const cutoffDate = new Date(today);
    cutoffDate.setDate(today.getDate() - rangeDays);

    return performance.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  };

  const filteredData = filterDataByRange(timeRanges[selectedRange]);

  const data = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: 'Fund 1',
        data: filteredData.map((item) => item.onlineFondet),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Fund 2',
        data: filteredData.map((item) => item.osebx),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainsAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="min-w-[250px] h-64 md:h-96 lg:h-fit">
        <Line data={data} options={options} />
      </div>
      <div className="flex justify-center mb-4 pt-4 space-x-4 md:hidden overflow-x-auto">
        <div className="flex space-x-4 px-2">
          {Object.keys(timeRanges).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range as keyof typeof timeRanges)}
              className={`px-4 py-2 rounded text-gray-200 border border-gray-700 ${selectedRange === range ? 'bg-blue-700' : 'bg-gray-900'}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="hidden md:flex justify-center pt-4 mb-4 space-x-4">
        {Object.keys(timeRanges).map((range) => (
          <button
            key={range}
            onClick={() => setSelectedRange(range as keyof typeof timeRanges)}
            className={`px-4 py-2 rounded text-gray-200 border border-gray-700 ${selectedRange === range ? 'bg-blue-700' : 'bg-gray-900'}`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
