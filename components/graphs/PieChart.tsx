import { lazy } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/joy/CircularProgress';

const ReactApexChart = lazy(
  () => import('react-apexcharts') /* , { ssr: false } */,
);

export default function PieChart() {
  const isLoading = false;

  const getPieData = (data: { data: { percent: number }[] }) => {
    const dataPie: number[] = [];
    data.data.forEach((arr) => {
      const val = arr.percent.toString().slice(0, 4);
      dataPie.push(Number(val));
    });
    return dataPie;
  };

  const getPieLabels = (data: { data: { instrument: { name: string } }[] }) => {
    const labelData: string[] = [];
    data.data.forEach((arr) => {
      labelData.push(arr.instrument.name);
    });
    return labelData;
  };

  const data = {
    data: [
      { instrument: { name: 'Instrument1' }, percent: 7 },
      { instrument: { name: 'Instrument2' }, percent: 6 },
      { instrument: { name: 'Instrument3' }, percent: 5 },
      { instrument: { name: 'Instrument4' }, percent: 4 },
      { instrument: { name: 'Instrument5' }, percent: 3 },
      { instrument: { name: 'Instrument6' }, percent: 2 },
      { instrument: { name: 'Instrument7' }, percent: 1 },
    ],
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
