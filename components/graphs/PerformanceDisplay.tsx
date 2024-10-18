import LineChart from './LineChart';
import PieChart from './PieChart';

const PerformanceDisplay = () => {
  return (
    <div>
      <div className="w-full mb-10">
        <div className="w-full mt-40 mb-10 text-lg text-center">
          Denne smultringen gir en oversikt over fondets sammensetning (FAKE
          DATA)
        </div>
        <PieChart />
      </div>
      <div className="w-full mt-40">
        <div className="w-full mb-10 text-lg text-center">
          Fondets prestasjon over tid (FAKE DATA)
        </div>
        <LineChart />
      </div>

      <div className="w-3/4 mt-40">
        <div className="mb-10 text-lg text-center">
          Tabellen viser fond, andel og kategori (FAKE DATA)
        </div>
        {/* <Table /> */}
      </div>
    </div>
  );
};

export default PerformanceDisplay;
