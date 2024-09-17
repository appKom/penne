'use client';

import { useState } from 'react';
import PerformanceChart from './PerformanceChart';
import PeriodBar from './PeriodBar';
import Box from '@mui/material/Box';

import CircularProgress from '@mui/joy/CircularProgress';
import { useGetBothPerformanceQuery } from '@/lib/services/ApiService';

export default function PerformanceDisplay() {
  const { data, error, isLoading } = useGetBothPerformanceQuery();
  const [period, setPeriod] = useState('y5');

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
        <p>error</p>
      ) : (
        <div>
          <PerformanceChart data={data} period={period} />

          <PeriodBar setPeriod={setPeriod} />
        </div>
      )}
    </Box>
  );
}
