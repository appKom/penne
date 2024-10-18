import Table from '../form/Table';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { pieMockData } from '@/lib/mockData';
import { OnlineFondType } from '@/lib/types';

const PerformanceDisplay = () => {
  const columns = [
    {
      header: 'Fond',
      accessor: 'company' as keyof OnlineFondType,
    },
    {
      header: 'Andel',
      accessor: 'percentage' as keyof OnlineFondType,
    },
    {
      header: 'Kategori',
      accessor: 'category' as keyof OnlineFondType,
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
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

      <div className="w-full  my-40">
        <div className="my-16 text-lg text-center">
          Tabellen viser fond, andel og kategori (FAKE DATA)
        </div>
        <Table columns={columns} data={pieMockData} />
      </div>
    </div>
  );
};

export default PerformanceDisplay;
