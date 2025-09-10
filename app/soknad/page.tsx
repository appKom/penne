import FondApplications from '@/components/Submissions/FondApplications';
import { APPLICATION_DATES } from '@/lib/constants';
import { ArrowRightIcon } from 'lucide-react';

const formatDateNorwegian = (month: number, day: number) => {
  const date = new Date(0, month, day); // year 0 is arbitrary here
  return date.toLocaleDateString("nb-NO", { day: "numeric", month: "long" });
};

const applicationContent = {
  title: 'Søknader til Onlines fond',
  intro: [
    'Alle Onlines medlemmer kan søke Onlines fond om penger. Søknaden skal være velbegrunnet og ha som hensikt å komme flest mulig medlemmer av Online til gode. For at Fondstyret skal kunne ta en god avgjørelse trenger vi en helhetlig forståelse av hvem dere er og hva dere gjør. Skriv heller litt for mye enn litt for lite.',
    'Søknader fra og med 10 000 kr til og med 100 000 kr kan behandles av Fondstyret, og godkjennes med alminnelig flertall. Søknader på større beløp enn dette skal behandles på fondets generalforsamling, eventuelt på ekstraordinær generalforsamling dersom søknadens omstendigheter krever svar før neste ordinære generalforsamling.',
    'Fondstyret behandler søknader fire ganger i året. Fristene for å sende inn søknad er:',
  ],
  deadlines: APPLICATION_DATES.map(({ month, day }) => formatDateNorwegian(month, day)),
  outro: [
    'Fondstyret skal i utgangspunktet fatte vedtak innen 14 dager etter hver søknadsfrist. Dersom det foreligger særlige akutte søknader, kan Fondstyret beslutte å behandle disse fortløpende uten å avvente ordinære frister.',
    'Gjerne ta kontakt med oss i Fondstyret dersom du lurer på noe angående søknader til fondet!',
  ],
  requiredFields: [
    'Beskrivelse av dere selv',
    'Hva midlene skal brukes til',
    'Hvordan midlene går onlinere til gode',
    'Aktivitetsplan',
    'Budsjett',
  ],
  email: "fond@online.ntnu.no",
};

const ApplicationPage = () => (
  <div className="max-w-5xl px-4 py-10 mx-auto sm:py-20 sm:px-6 lg:px-8">
    <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-center">{applicationContent.title}</h1>

    <div className="space-y-12">
      <section>
        <SemiTitle text="Hvordan søke om støtte?" />
        {applicationContent.intro.map((text, index) => (
          <p key={index} className="mb-4 text-lg leading-relaxed text-gray-400">
            {text}
          </p>
        ))}

        <ul className="mb-4 space-y-1 text-gray-300 list-disc list-inside marker:text-gray-500">
          {applicationContent.deadlines.map((deadline, index) => (
            <li key={index} className="text-lg">
              {deadline}
            </li>
          ))}
        </ul>

        {applicationContent.outro.map((text, index) => (
          <p key={index} className="mb-4 text-lg leading-relaxed text-gray-400">
            {text}
          </p>
        ))}
      </section>

      <section>
        <SemiTitle text="Søknader sendes til:" />
        <a
          href={'mailto:' + applicationContent.email}
          className="flex items-center text-blue-400 transition-colors duration-200 hover:text-blue-300 group p-6 bg-[#1c2132] rounded-lg"
        >
          {applicationContent.email}
          <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </section>

      <section>
        <SemiTitle text="Søknaden må inneholde:" />
        <ul className="space-y-4 text-gray-300">
          {applicationContent.requiredFields.map((item, index) => (
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
