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
        data: dataValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(201, 203, 207, 0.6)',
          'rgba(255, 99, 255, 0.6)',
          'rgba(0, 255, 127, 0.6)',
          'rgba(255, 215, 0, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(201, 203, 207, 1)',
          'rgba(255, 99, 255, 1)',
          'rgba(0, 255, 127, 1)',
          'rgba(255, 215, 0, 1)',
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
      tooltip: {
        callbacks: {
          label: (ctx) => `${Math.round(ctx.raw * 100) / 100}%`
        }
      },
    }
  };

  return (
    <div className="w-full max-w-lg  flex justify-center items-center mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
