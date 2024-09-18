'use client';

import { useState } from 'react';
import PerformanceChart from './PerformanceChart';
import PeriodBar from './PeriodBar';
import Box from '@mui/material/Box';

import CircularProgress from '@mui/joy/CircularProgress';
/* import { useGetBothPerformanceQuery } from '@/lib/services/ApiService'; */

export default function PerformanceDisplay() {
  // TODO: this function expected arguments, just commented out for now, and replaced with dummy data
  /* const { data, error, isLoading } = useGetBothPerformanceQuery(); */
  const [period, setPeriod] = useState('y5');

  const data = {
    online: [1, 2, 3, 4, 5, 6, 7],
    osebx: [7, 6, 5, 4, 3, 2, 1],
  };
  const isLoading = false;
  const error = false;

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
