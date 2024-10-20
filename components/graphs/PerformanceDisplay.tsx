import useSWR from 'swr';
import ErrorPage from '../all/Error';
import Table from '../form/Table';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { onlineFondData } from '@/lib/mockData';
import { CompositionType } from '@/lib/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PerformanceDisplay = () => {
  const { data: osebxData, error: osebxError } = useSWR('/api/osebx', fetcher);
  const { data: compositionData, error: compositionError } = useSWR(
    '/api/admin/composition',
    fetcher,
  );

  if (osebxError || compositionError) return <ErrorPage error="Portfølje" />;

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

  if (!osebxData || !compositionData) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-3xl mx-auto px-5">
      <div className="w-full">
        <div className="w-full my-16 text-lg text-center">
          Denne smultringen gir en oversikt over fondets sammensetning (FAKE
          DATA)
        </div>
        <PieChart composition={compositionData.composition} />
      </div>
      <div className="w-full mt-10">
        <div className="w-full my-16 text-lg text-center">
          Fondets prestasjon over tid (FAKE DATA)
        </div>
        <LineChart
          onlineFondet={onlineFondData.onlinePerformance}
          osebx={osebxData.data}
        />
      </div>

      <div className="w-full  my-16">
        <div className="my-16 text-lg text-center">
          Tabellen viser fond, andel og kategori (FAKE DATA)
        </div>
        <Table columns={columns} data={compositionData.composition} />
      </div>
    </div>
  );
};

export default PerformanceDisplay;
