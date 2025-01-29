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
  // '1 måned': 30, TODO: add if we ever get actual data from Shareville
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

const sortData = (data: GraphType[]) => {
  return data.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
};

const generateDateRange = (startDate: Date, endDate: Date) => {
  const dates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

//Binary search, hvem sa jeg strøk algdat?
const interpolateValue = (
  data: GraphType[],
  targetDate: Date,
): number | null => {
  const targetTime = targetDate.getTime();

  if (data.length === 0) return null;

  if (targetTime <= new Date(data[0].date).getTime()) return data[0].value;
  if (targetTime >= new Date(data[data.length - 1].date).getTime())
    return data[data.length - 1].value;

  let left = 0;
  let right = data.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midTime = new Date(data[mid].date).getTime();

    if (midTime === targetTime) {
      return data[mid].value;
    } else if (midTime < targetTime) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  const before = data[right];
  const after = data[left];

  if (before && after) {
    const beforeTime = new Date(before.date).getTime();
    const afterTime = new Date(after.date).getTime();
    const ratio = (targetTime - beforeTime) / (afterTime - beforeTime);
    return before.value + ratio * (after.value - before.value);
  } else {
    return null;
  }
};

const normalizeInterpolatedData = (
  data: { date: Date; value: number | null }[],
) => {
  if (data.length === 0) return [];
  const startValue = data[0].value;
  return data.map((item) => ({
    ...item,
    value:
      item.value !== null && startValue !== null
        ? (item.value / startValue) * 100
        : null,
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
        color: 'white',
      },
      ticks: {
        callback: function (value: string | number) {
          if (typeof value === 'number') {
            return `${value}%`;
          }
          return value;
        },
        color: 'white',
      },
    },
    x: {
      ticks: {
        color: 'white',
        maxTicksLimit: 12,
      },
    },
  },
};

const LineChart = ({ onlineFondet, osebxData }: Props) => {
  const [selectedRange, setSelectedRange] =
    useState<keyof typeof timeRanges>('5 år');

  const sortedOnlineFondet = useMemo(
    () => sortData(onlineFondet),
    [onlineFondet],
  );
  const sortedOsebx = useMemo(() => sortData(osebxData), [osebxData]);

  const today = useMemo(() => new Date(), []);
  const cutoffDate = useMemo(() => {
    const date = new Date(today);
    date.setDate(today.getDate() - timeRanges[selectedRange]);
    return date;
  }, [today, selectedRange]);

  const dateRange = useMemo(
    () => generateDateRange(cutoffDate, today),
    [cutoffDate, today],
  );

  const interpolatedOnlineFondet = useMemo(() => {
    return dateRange.map((date) => {
      const value = interpolateValue(sortedOnlineFondet, date);
      return { date, value };
    });
  }, [sortedOnlineFondet, dateRange]);

  const interpolatedOsebx = useMemo(() => {
    return dateRange.map((date) => {
      const value = interpolateValue(sortedOsebx, date);
      return { date, value };
    });
  }, [sortedOsebx, dateRange]);

  const normalizedOnlineFondet = useMemo(
    () => normalizeInterpolatedData(interpolatedOnlineFondet),
    [interpolatedOnlineFondet],
  );

  const normalizedOsebx = useMemo(
    () => normalizeInterpolatedData(interpolatedOsebx),
    [interpolatedOsebx],
  );

  const labels = useMemo(
    () =>
      dateRange.map((date) =>
        date.toLocaleDateString('nb-NO', {
          year: 'numeric',
          month: 'short',
        }),
      ),
    [dateRange],
  );

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: 'Onlinefondet',
          data: normalizedOnlineFondet.map((item) => item.value),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          spanGaps: true,
        },
        {
          label: 'OSEBX',
          data: normalizedOsebx.map((item) => item.value),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
          spanGaps: true,
        },
      ],
    }),
    [labels, normalizedOnlineFondet, normalizedOsebx],
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
