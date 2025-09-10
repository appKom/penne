import PerformanceDisplay from '@/components/graphs/PerformanceDisplay';
import ScrollDownIcon from '@/components/home/ScrollDownIcon';
import Splash from '@/components/home/Splash';

export const revalidate = 36000;

const homeText = [
  'Et fond er en kollektiv investering der flere går sammen for å plassere penger i verdipapirmarkedet. Dette kalles ofte kollektiv sparing, og man kan se for seg at et fond er en kurv med investeringer. Online har et slikt fond, noe som betyr at Online investerer i ulike verdipapirer.',
  'Under ser du en oversikt over utviklingen av Onlinefondet. Grafen inkluderer også en oversikt over OSEBX, som er hovedindeksen på Oslo Børs. Disse grafene kan sammenlignes for å se hvordan Onlines fond har utviklet seg i forhold til hovedindeksen.',
];

const HomePage = () => (
  <div className="flex flex-col items-center justify-center">
    <Splash />
    <ScrollDownIcon />
    <div
      id="home-text"
      className="w-full py-16 text-lg bg-gray-950 border-y border-[#293046]"
    >
      <div className="max-w-3xl m-auto px-4">
        <h1 className="text-4xl mb-2">Hva er et fond?</h1>
        {homeText.map((text, index) => (
          <p key={index} className="mb-4 text-lg leading-relaxed text-gray-200">
            {text}
          </p>
        ))}
      </div>
    </div>
    <PerformanceDisplay />
  </div>
);

export default HomePage;
