import { GraphType, OnlineFondType } from './types';

export const graphMockData: GraphType[] = [
  { date: '2024-01-01', onlineFondet: 100, osebx: 110 },
  { date: '2024-02-01', onlineFondet: 102, osebx: 115 },
  { date: '2024-03-01', onlineFondet: 105, osebx: 120 },
  { date: '2024-04-01', onlineFondet: 107, osebx: 125 },
  { date: '2024-05-01', onlineFondet: 110, osebx: 130 },
  { date: '2024-06-01', onlineFondet: 115, osebx: 135 },
  { date: '2024-07-01', onlineFondet: 120, osebx: 140 },
  { date: '2024-08-01', onlineFondet: 125, osebx: 145 },
  { date: '2024-09-01', onlineFondet: 130, osebx: 150 },
  { date: '2024-10-01', onlineFondet: 135, osebx: 155 },
];

export const pieMockData: OnlineFondType[] = [
  {
    date: new Date('2024-10-01'),
    company: 'Tech Investments Ltd.',
    percentage: 20,
  },
  {
    date: new Date('2024-09-15'),
    company: 'Green Energy Fund',
    percentage: 30,
  },
  {
    date: new Date('2024-08-20'),
    company: 'HealthTech Innovations',
    percentage: 10,
  },
  {
    date: new Date('2024-07-10'),
    company: 'AI Solutions Inc.',
    percentage: 10,
  },
  {
    date: new Date('2024-06-05'),
    company: 'Blockchain Ventures',
    percentage: 30,
  },
];
