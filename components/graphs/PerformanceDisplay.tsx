import useSWR from 'swr';
import ErrorPage from '../all/Error';
import Table from '../form/Table';
import LineChart from './LineChart';
import PieChart from './PieChart';

import { CompositionType } from '@/lib/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PerformanceDisplay = () => {
  const { data: osebxData, error: osebxError } = useSWR('/api/osebx', fetcher);
  const { data: compositionData, error: compositionError } = useSWR(
    '/api/admin/composition',
    fetcher,
  );

  const { data: onlineFondetData, error: onlineFondetError } = useSWR(
    '/api/admin/portfolio',
    fetcher,
  );

  if (osebxError || compositionError || onlineFondetError)
    return <ErrorPage error="Portfølje" />;

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

  return (
    <div className="w-full max-w-3xl mx-auto px-5">
      <div className="w-full">
        <div className="w-full my-16 text-lg text-center">
          Denne smultringen gir en oversikt over fondets sammensetning
        </div>
        {compositionData ? (
          <PieChart composition={compositionData.composition} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 text-center w-full h-full animate-pulse">
            <div className="overflow-hidden rounded-full bg-gray-700 h-56 w-56 lg:w-72 lg:h-72" />
          </div>
        )}
      </div>
      <div className="w-full mt-10">
        <div className="w-full my-16 text-lg text-center">
          Fondets prestasjon over tid
        </div>
        {onlineFondetData ? (
          <LineChart
            onlineFondet={onlineFondetData.performance}
            osebx={osebxData.data}
          />
        ) : (
          <div className="px-5">
            <div className="flex flex-col items-center justify-center gap-4 text-center w-full h-full animate-pulse">
              <div className="overflow-hidden bg-gray-700 h-48 w-64 lg:w-96 lg:h-64" />
            </div>
          </div>
        )}
      </div>

      <div className="w-full  my-16">
        <div className="my-16 text-lg text-center">
          Tabellen viser fond, andel og kategori
        </div>
        {compositionData ? (
          <Table columns={columns} data={compositionData.composition} />
        ) : (
          <div className="px-5">
            <div className="flex flex-col items-center justify-center gap-4 text-center w-full h-full animate-pulse">
              <div className="overflow-hidden bg-gray-700 h-48 w-64 lg:w-96 lg:h-64" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceDisplay;
