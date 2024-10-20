import Table from '../form/Table';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { onlineFondData } from '@/lib/mockData';
import { CompositionType } from '@/lib/types';

const PerformanceDisplay = () => {
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
          Denne smultringen gir en oversikt over fondets sammensetning (FAKE
          DATA)
        </div>
        <PieChart />
      </div>
      <div className="w-full mt-10">
        <div className="w-full my-16 text-lg text-center">
          Fondets prestasjon over tid (FAKE DATA)
        </div>
        <LineChart />
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
