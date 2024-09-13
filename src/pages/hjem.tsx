import Footer from '../components/all/Footer';
import Table from '../components/home/Table';
import { Splash } from '../components/home/Splash';
import ScrollDownIcon from '../components/home/ScrollDownIcon';
import style from './index.module.css';
import PieChart from '../components/home/PieChart';
import PerformanceDisplay from '../components/home/PerformanceDisplay';

export default function IndexPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div id={style.splash} className="relative mb-[500px] w-full">
        <Splash />
      </div>
      <div className="sticky bottom-10" id={style.scroll}>
        <ScrollDownIcon />
      </div>
      <h1 id={style.overskrift}> Online Fondet </h1>
      <div className="w-3/4 mb-10 text-lg text-justify">
        <p className="">
          Et fond er en kollektiv invistering der flere går sammen å plasserer
          penger i verdipapirmarkedet. Dette kalles ofte for kollektiv sparing,
          og man kan se for seg at et fond er en kurv med investeringer. Online
          har et slikt fond, dette betyr at ulike parter innvesterer i Online,
          noe vi setter stor pris på. Under finner du en graf, denne grafen er
          en oversikt over utviklingen av Online sitt fond. Grafen inkluderer
          også en graf for OSEBX, som er hovedindeksen på Oslo Børs. Disse
          grafene kan sammenlignes for å se hvordan Online sitt fond har
          utviklet seg i forhold til hovedindeksen på Oslo Børs. Under finner du
          en graf, denne grafen er en oversikt over den relative utviklingen til
          Online sitt fond.
        </p>
        <br></br>
      </div>
      <PerformanceDisplay />
      <br></br>
      <div id={style.donut} className="w-full">
        <div className="text-lg w-full text-center mt-40 mb-10">
          <p className="w-full">
            Denne smultringen gir en oversikt over fondets sammensetning (FAKE
            DATA)
          </p>
        </div>
        <PieChart />
      </div>
      <br></br>
      <br></br>
      <div className="text-lg w-3/4 text-center mt-40 mb-10">
        <p className="w-full">
          Tabellen viser fond, andel og kategori (FAKE DATA)
        </p>
      </div>
      <div className="w-3/4">
        <Table />
      </div>
      <br></br>
      <Footer />
    </div>
  );
}
