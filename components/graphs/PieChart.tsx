'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { pieMockData } from '@/lib/mockData';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const labels = pieMockData.map((item) => item.company);
  const dataValues = pieMockData.map((item) => item.percentage);

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

  return <Pie data={data} options={options} />;
};

export default PieChart;
