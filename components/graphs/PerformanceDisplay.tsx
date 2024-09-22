'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import PeriodBar from './PeriodBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import yahooFinance from 'yahoo-finance2';

const PerformanceChart = dynamic(() => import('./PerformanceChart'), {
  ssr: false,
});

export interface PerformanceData {
  online: { date: string; value: number }[];
  osebx: { date: string; value: number }[];
}

export default function PerformanceDisplay() {
  const [period, setPeriod] = useState('y5');
  const [data, setData] = useState<PerformanceData>({ online: [], osebx: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOSEBXData() {
      try {
        setIsLoading(true);
        setError(null);

        console.log('Fetching data');

        const osebxDataRaw = await yahooFinance.chart('^OSEBX', {
          period1: '2018-01-01',
          period2: new Date().toISOString().split('T')[0],
          interval: '1d',
        });

        const osebxData = osebxDataRaw.quotes.map((item) => ({
          date: item.date.toISOString().split('T')[0],
          value: item.close !== null ? item.close : 0,
        }));

        const onlineData = [
          { date: '2021-07-10', value: 100 },
          { date: '2021-07-11', value: 102 },
          { date: '2022-07-12', value: 101 },
          { date: '2022-07-13', value: 105 },
          { date: '2023-07-14', value: 98 },
          { date: '2023-07-15', value: 100 },
          { date: '2024-08-14', value: 98 },
          { date: '2024-09-15', value: 100 },
          { date: '2024-09-16', value: 102 },
          { date: '2024-09-17', value: 101 },
          { date: '2024-09-18', value: 105 },
          { date: '2024-09-19', value: 107 },
          { date: '2024-09-20', value: 109 },
        ];
        setData({
          online: onlineData,
          osebx: osebxData,
        });

        setIsLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setIsLoading(false);
      }
    }

    fetchOSEBXData();
  }, [period]);

  return (
    <Box
      maxWidth={700}
      width={9 / 10}
      border={''}
      padding={3}
      borderRadius={4}
      margin={'0 auto'}
    >
      {isLoading ? (
        <Box width={'100%'} display={'flex'} justifyContent={'center'}>
          <CircularProgress size="lg" variant="plain" />
        </Box>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <PerformanceChart data={data} period={period} />
          <PeriodBar setPeriod={setPeriod} />
        </div>
      )}
    </Box>
  );
}
