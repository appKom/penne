import PastMembers from '@/components/about/PastMembers';
import { aboutUsText } from '@/lib/content';
import { MemberType } from '@/lib/types';
import { prisma } from '@/lib/prisma';
import CurrentMembers from '@/components/about/CurrentMembers';

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
      <div className="flex flex-col items-center justify-center w-full gap-6 m-auto">
        {aboutUsText.map((paragraph) => (
          <p key={paragraph} className="text-gray-400 md:leading-7 md:text-lg">
            {paragraph}
          </p>
        ))}
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
