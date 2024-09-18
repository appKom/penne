// @ts-nocheck
// TODO: Remove the ts-nocheck comment and fix TS issues, @akselsf?

import { lazy } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import { useGetPositionsQuery } from '@/lib/services/ApiService';

const ReactApexChart = lazy(
  () => import('react-apexcharts') /* , { ssr: false } */,
);

export default function PieChart() {
  const { data, isLoading } = useGetPositionsQuery();

  const getPieData = (data) => {
    const dataPie = [];
    data.data.forEach((arr) => {
      const val = arr.percent.toString().slice(0, 4);
      dataPie.push(Number(val));
    });
    return dataPie;
  };

  const getPieLabels = (data) => {
    const labelData = [];
    data.data.forEach((arr) => {
      labelData.push(arr.instrument.name);
    });
    return labelData;
  };

  return (
    <Box
      maxWidth={700}
      width={9 / 10}
      boxShadow={3}
      padding={3}
      borderRadius={4}
      margin={'0 auto'}
    >
      {isLoading ? (
        <Box width={'100%'} display={'flex'} justifyContent={'center'}>
          <CircularProgress size="lg" variant="plain" />
        </Box>
      ) : data ? (
        <ReactApexChart
          options={{
            chart: {
              stacked: false,
              height: 360,
              width: 380,
              type: 'donut',
              foreColor: '#ffffff',
              zoom: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            colors: [
              '#e60049',
              '#0bb4ff',
              '#50e991',
              '#e6d800',
              '#9b19f5',
              '#ffa300',
              '#dc0ab4',
              '#b3d4ff',
              '#00bfa0',
            ],
            labels: getPieLabels(data),
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: 'bottom',
                  },
                },
              },
            ],
          }}
          series={getPieData(data)}
          type="donut"
        />
      ) : (
        <p>error</p>
      )}
    </Box>
  );
}
