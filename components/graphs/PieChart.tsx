'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CompositionType } from '@/lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  composition: CompositionType[];
}

const PieChart = ({ composition }: Props) => {
  const labels = composition.map((item) => item.company);
  const dataValues = composition.map((item) => item.percentage);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Fund Composition',
        data: dataValues,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="w-full max-w-lg  flex justify-center items-center mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
