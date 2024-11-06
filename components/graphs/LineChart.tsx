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
  Legend, ChartOptions,
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
  '1 måned': 30,
  '3 måneder': 90,
  '6 måneder': 180,
  '1 år': 365,
  '3 år': 365 * 3,
  '5 år': 365 * 5,
};

interface Props {
  onlineFondet: GraphType[];
  osebx: GraphType[];
}

const LineChart = ({ onlineFondet, osebx }: Props) => {
  const [selectedRange, setSelectedRange] =
    useState<keyof typeof timeRanges>('5 år');

  const filterDataByRange = (data: GraphType[], rangeDays: number) => {
    const today = new Date();
    const cutoffDate = new Date(today);
    cutoffDate.setDate(today.getDate() - rangeDays);

    return data
      .filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= cutoffDate;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const normalizeData = (data: GraphType[]) => {
    if (data.length === 0) return [];
    const startValue = data[0].value;
    return data.map((item) => ({
      ...item,
      value: (item.value / startValue) * 100,
    }));
  };

  const filteredOnlineFondet = filterDataByRange(
    onlineFondet,
    timeRanges[selectedRange],
  );
  const filteredOsebx = filterDataByRange(osebx, timeRanges[selectedRange]);

  const normalizedOnlineFondet = normalizeData(filteredOnlineFondet);
  const normalizedOsebx = normalizeData(filteredOsebx);

  const allDatesSet = new Set([
    ...normalizedOnlineFondet.map((item) => item.date),
    ...normalizedOsebx.map((item) => item.date),
  ]);
  const allDates = Array.from(allDatesSet)
    .map((date) => new Date(date))
    .sort((a, b) => a.getTime() - b.getTime())
    .map((date) => date.toISOString().split('T')[0]);

  const mergedData = allDates.map((date) => {
    const onlineFondetItem = normalizedOnlineFondet.find(
      (item) => (item.date as unknown as string).split('T')[0] === date,
    );
    const osebxItem = normalizedOsebx.find(
      (item) => (item.date as unknown as string).split('T')[0] === date,
    );

    return {
      date,
      onlineFondetValue: onlineFondetItem ? onlineFondetItem.value : null,
      osebxValue: osebxItem ? osebxItem.value : null,
    };
  });

  const data = {
    labels: mergedData.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleDateString('nb-NO', {
        year: 'numeric',
        month: 'short',
      });
    }),
    datasets: [
      {
        label: 'Onlinefondet',
        data: mergedData.map((item) => item.onlineFondetValue),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        spanGaps: true,
      },
      {
        label: 'OSEBX',
        data: mergedData.map((item) => item.osebxValue),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        spanGaps: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${Math.round(ctx.raw as number * 100) / 100}%`
        }
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Verdi (%)',
        },
        ticks: {
          callback: function (value: string | number) {
            if (typeof value === 'number') {
              return `${value}%`;
            }
            return value;
          },
        },
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
              className={`px-4 py-2 rounded text-gray-200 border border-gray-700 w-28 ${
                selectedRange === range ? 'bg-blue-700' : 'bg-gray-900'
              }`}
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
            className={`px-4 py-2 rounded text-gray-200 border border-gray-700 w-28 ${
              selectedRange === range ? 'bg-blue-700' : 'bg-gray-900'
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
