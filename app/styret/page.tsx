import PastMembers from '@/components/about/PastMembers';
import { MemberType } from '@/lib/types';
import { prisma } from '@/lib/prisma';
import CurrentMembers from '@/components/about/CurrentMembers';

export const revalidate = 36000;

const AboutPage = async () => {
  const members: MemberType[] = await prisma.member.findMany({});

  const pastMembers: MemberType[] = await prisma.member.findMany({
    where: { isCurrent: false },
  });

  return (
    <div className="max-w-5xl px-4 py-10 mx-auto sm:py-20 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-center">
        Fondstyret
      </h1>
      <SemiTitle text="Hvem er vi?" />
      <div className="flex flex-col items-start justify-center w-full gap-6 m-auto">
        <Paragraph text="Onlinefondet er en gruppe i linjeforeningen Online. Gjennom vårt fond, ledet av et dedikert Fondstyre, gir vi økonomisk støtte til initiativer som sikrer at Onlines medlemmers behov og interesser blir ivaretatt. Fra å finansiere nytt musikkutstyr for vårt linjeforeningsband, støtte ny sofa på kontoret og gi bidrag til sosiale arrangementer, streber vi etter å gi tilbake til nåværende og fremtidig medlemmer av Online." />
        <Paragraph text="Fondstyret består til enhver tid av:" />
        <List items={["2 Riddere av det Indre lager", "2 tidligere medlemmer av Hovedstyret", "2 onlinemedlemmer", "Økonomiansvarlig i Online"]} />
        <Paragraph text="Medlemmene blir valgt gjennom Fondets generalforsamlingen på våren, og besitter vervet i to år. Alle medlemmer av Fondstyret har stemmerett, og Fondstyret velger sin egen leder." />
        <Paragraph text="For øyeblikket består fondet av:" />
      </div>
      <CurrentMembers members={members} />

      <SemiTitle text="Tidligere medlemmer" />
      <PastMembers members={pastMembers} />
    </div>
  );
};

export default AboutPage;

const SemiTitle = ({ text }: { text: string }) => (
  <h1 className="mb-4 text-2xl font-semibold">{text}</h1>
);

const Paragraph = ({ text }: { text: string }) => (
  <p className="text-gray-400 md:leading-7 md:text-lg">{text}</p>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="text-gray-400 md:leading-7 md:text-lg ">
    {items.map((item, index) => (
      <li key={index}>- {item}</li>
    ))}
  </ul>
);