import useSWR from 'swr';
import ErrorPage from '../all/Error';
import Table from '../form/Table';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { onlineFondData } from '@/lib/mockData';
import { CompositionType } from '@/lib/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PerformanceDisplay = () => {
  const { data, error } = useSWR('/api/osebx', fetcher);

  console.log(data);

  if (error) return <ErrorPage error="OSEBX" />;

  const columns = [
    {
      header: 'Fond',
      accessor: 'company' as keyof CompositionType,
    },
    {
      header: 'Andel',
      accessor: 'percentage' as keyof CompositionType,
    },
    {
      header: 'Kategori',
      accessor: 'category' as keyof CompositionType,
    },
  ];

  if (!data) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-3xl mx-auto px-5">
      <div className="w-full">
        <div className="w-full my-16 text-lg text-center">
          Denne smultringen gir en oversikt over fondets sammensetning (FAKE
          DATA)
        </div>
        <PieChart composition={onlineFondData.compostion} />
      </div>
      <div className="w-full mt-10">
        <div className="w-full my-16 text-lg text-center">
          Fondets prestasjon over tid (FAKE DATA)
        </div>
        <LineChart
          onlineFondet={onlineFondData.onlinePerformance}
          osebx={data.data}
        />
      </div>

      <div className="w-full  my-16">
        <div className="my-16 text-lg text-center">
          Tabellen viser fond, andel og kategori (FAKE DATA)
        </div>
        <Table columns={columns} data={onlineFondData.compostion} />
      </div>
    </div>
  );
};

export default PerformanceDisplay;
