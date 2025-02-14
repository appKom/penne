import FondApplications from '@/components/Submissions/FondApplications';
import { applicationText } from '@/lib/content';
import { ArrowRightIcon } from 'lucide-react';

const email = 'fond@online.ntnu.no';

const applicationContent = [
  'Beskriv dere selv',
  'Hva midlene skal brukes til',
  'Hvordan midlene går onlinere til gode',
  'Aktivitetsplan',
  'Budsjett',
];

const ApplicationPage = () => (
  <div className="max-w-5xl px-4 py-10 mx-auto sm:py-20 sm:px-6 lg:px-8">
    <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-center">
      Søke om støtte
    </h1>

    <div className="space-y-12">
      <section>
        <SemiTitle text="Hvordan søke om støtte?" />
        {applicationText.map((text, index) => (
          <p key={index} className="mb-4 text-lg leading-relaxed text-gray-400">
            {text}
          </p>
        ))}
      </section>

      <section>
        <SemiTitle text="Søknader sendes til:" />
        <a
          href={'mailto:' + email}
          className="flex items-center text-blue-400 transition-colors duration-200 hover:text-blue-300 group p-6 bg-[#1c2132] rounded-lg"
        >
          {email}
          <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </section>

      <section>
        <SemiTitle text="Søknaden må inneholde:" />
        <ul className="space-y-4 text-gray-300">
          {applicationContent.map((item, index) => (
            <li key={index} className="flex items-center text-lg">
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 font-medium bg-blue-500 rounded-full">
                {index + 1}
              </div>
              {item}
            </li>
          ))}
        </ul>
      </section>
      <FondApplications />
    </div>
  </div>
);

export default ApplicationPage;

const SemiTitle = ({ text }: { text: string }) => {
  return <h1 className="mb-4 text-2xl font-semibold">{text}</h1>;
};
