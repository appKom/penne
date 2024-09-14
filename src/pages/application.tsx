import Title from '../components/all/Title';
import HorizontalLine from '../components/all/HorizontalLine';
import SubTitle from '../components/all/SubTitle';
import Paragraph from '../components/all/Paragraph';
import { applicationText } from '../content';

const applicationContent = [
  'Beskriv dere selv',
  'Hva midlene skal brukes til',
  'Hvordan midlene går onlinere til gode',
  'Aktivitetsplan',
  'Budsjett',
];

const ApplicationPage = () => (
  <div className="flex flex-col items-center justify-center w-full h-full">
    <div className="w-full p-12 sm:w-4/5">
      <Title title="Søke om støtte" />
      <HorizontalLine />
      <SubTitle title="Hvordan søke om støtte?" />
      <Paragraph text={applicationText} />
      <Paragraph text="Søknader sendes til fondet@online.ntnu.no" />
      <Paragraph text="Dette skal være med i søknaden:" />
      <ul className="mt-8">
        {applicationContent.map((item) => (
          <li className="mx-8 my-4 text-xl list-disc sm:mx-12 md:mx-16">
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ApplicationPage;
