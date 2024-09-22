'use client';

import ReactApexChart from 'react-apexcharts';
import { PerformanceData } from './PerformanceDisplay';

interface Props {
  period: string;
  data: PerformanceData;
}

export default function PerformanceChart({ period, data }: Props) {
  const onlineColor = '#ffffff';
  const osebxColor = '#00ff00';

  interface DataPoint {
    date: string;
    value: number;
  }

  function getFormattedArray(data: DataPoint[], period: string) {
    const currentDate = new Date();
    const w1 = new Date(currentDate.getTime() - 1000 * 60 * 60 * 24 * 7);
    const m1 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate(),
    );
    const m3 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 3,
      currentDate.getDate(),
    );
    const m6 = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 6,
      currentDate.getDate(),
    );
    const y1 = new Date(
      currentDate.getFullYear() - 1,
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const y3 = new Date(
      currentDate.getFullYear() - 3,
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const y5 = new Date(
      currentDate.getFullYear() - 5,
      currentDate.getMonth(),
      currentDate.getDate(),
    );

    let periodDate = undefined;
    switch (period) {
      case 'w1':
        periodDate = w1;
        break;
      case 'm1':
        periodDate = m1;
        break;
      case 'm3':
        periodDate = m3;
        break;
      case 'm6':
        periodDate = m6;
        break;
      case 'y1':
        periodDate = y1;
        break;
      case 'y3':
        periodDate = y3;
        break;
      case 'y5':
        periodDate = y5;
        break;
      default:
        periodDate = y5;
    }

    const filtered = [];
    if (data != undefined) {
      let start = undefined;
      for (let i = 0; i < data.length; i++) {
        if (new Date(data[i].date) >= periodDate) {
          if (start == undefined) {
            start = data[i].value;
            filtered.push({
              x: data[i].date,
              y: 1,
            });
          } else {
            filtered.push({
              x: data[i].date,
              y: (data[i].value / start) * 100 - 100,
            });
          }
        }
      }
    }

    return filtered;
  }

  return (
    <ReactApexChart
      options={{
        stroke: {
          colors: [onlineColor, osebxColor],
          curve: 'straight',
          width: 1,
        },

        chart: {
          type: 'line',

          stacked: false,
          height: 360,
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },

          foreColor: '#ffffff',
        },
        colors: [onlineColor, osebxColor],
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        fill: {
          colors: [onlineColor, osebxColor],
          type: 'fill',

          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          labels: {
            formatter: function (val: number) {
              return val.toString();
            },
          },
        },

        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd MMM yyyy',
          },
          tickAmount: 6,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
        },
        tooltip: {
          shared: true,
          theme: 'dark',
          x: {
            format: 'dd MMM yyyy',
          },

          y: {
            formatter: function (val: number) {
              return val != undefined ? val.toString().slice(0, 4) + '%' : '';
            },
          },
        },
      }}
      series={[
        {
          name: 'OnlineFondet',
          data: getFormattedArray(data.online, period),
        },
        {
          name: 'OSEBX',
          data: getFormattedArray(data.osebx, period),
        },
      ]}
    />
  );
}
