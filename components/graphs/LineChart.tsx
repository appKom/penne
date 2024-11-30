'use client';
import { useState, useMemo } from 'react';
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
  ChartOptions,
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
  osebxData: GraphType[];
}

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

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label: (ctx) => `${Math.round((ctx.raw as number) * 100) / 100}%`,
      },
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

const LineChart = ({ onlineFondet, osebxData }: Props) => {
  const [selectedRange, setSelectedRange] =
    useState<keyof typeof timeRanges>('5 år');

  const filteredOnlineFondet = useMemo(
    () => filterDataByRange(onlineFondet, timeRanges[selectedRange]),
    [onlineFondet, selectedRange],
  );

  const filteredOsebx = useMemo(
    () =>
      osebxData ? filterDataByRange(osebxData, timeRanges[selectedRange]) : [],
    [osebxData, selectedRange],
  );

  const normalizedOnlineFondet = useMemo(
    () => normalizeData(filteredOnlineFondet),
    [filteredOnlineFondet],
  );

  const normalizedOsebx = useMemo(
    () => normalizeData(filteredOsebx),
    [filteredOsebx],
  );

  const normalizedOnlineFondetMap = useMemo(() => {
    const map = new Map<string, number>();
    normalizedOnlineFondet.forEach((item) => {
      const date = new Date(item.date).toISOString().split('T')[0];
      map.set(date, item.value);
    });
    return map;
  }, [normalizedOnlineFondet]);

  const normalizedOsebxMap = useMemo(() => {
    const map = new Map<string, number>();
    normalizedOsebx.forEach((item) => {
      const date = new Date(item.date).toISOString().split('T')[0];
      map.set(date, item.value);
    });
    return map;
  }, [normalizedOsebx]);

  const allDates = useMemo(() => {
    const dates = new Set<string>();
    [...normalizedOnlineFondet, ...normalizedOsebx].forEach((item) => {
      const date = new Date(item.date).toISOString().split('T')[0];
      dates.add(date);
    });
    return Array.from(dates).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );
  }, [normalizedOnlineFondet, normalizedOsebx]);

  const mergedData = useMemo(
    () =>
      allDates.map((date) => ({
        date,
        onlineFondetValue: normalizedOnlineFondetMap.get(date) ?? null,
        osebxValue: normalizedOsebxMap.get(date) ?? null,
      })),
    [allDates, normalizedOnlineFondetMap, normalizedOsebxMap],
  );

  const chartData = useMemo(
    () => ({
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
    }),
    [mergedData],
  );

  if (!osebxData) {
    return (
      <div className="px-5">
        <div className="flex flex-col items-center justify-center gap-4 text-center w-full h-full animate-pulse">
          <div className="overflow-hidden bg-gray-700 h-48 w-64 lg:w-96 lg:h-64" />
        </div>
      </div>
    );
  }

  const renderRangeButtons = () => (
    <>
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
    </>
  );

  return (
    <div className="overflow-x-auto w-full">
      <div className="min-w-[250px] h-64 md:h-96 lg:h-fit">
        <Line data={chartData} options={options} />
      </div>
      <div className="flex justify-center mb-4 pt-4 space-x-4 md:hidden overflow-x-auto">
        <div className="flex space-x-4 px-2">{renderRangeButtons()}</div>
      </div>
      <div className="hidden md:flex justify-center pt-4 mb-4 space-x-4">
        {renderRangeButtons()}
      </div>
    </div>
  );
};

export default LineChart;
