'use client';

import Member from '@/components/about/Member';
import PastMembers from '@/components/about/PastMembers';
import { aboutUsText, currentMembers } from '@/lib/content';
import { TMember } from '@/lib/types';
import { motion } from 'framer-motion';

const AboutPage = () => (
  <div className="max-w-5xl px-4 py-10 mx-auto sm:py-20 sm:px-6 lg:px-8">
    <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-center">
      Fondstyret
    </h1>
    <SemiTitle text="Hvem er vi?" />
    <div className="flex flex-col items-center justify-center w-full gap-6 m-auto">
      {aboutUsText.map((paragraph) => (
        <p
          key={paragraph}
          className="text-left text-gray-400 md:leading-7 md:text-lg"
        >
          {paragraph}
        </p>
      ))}
    </div>

    <div className="flex flex-wrap items-center justify-center w-full max-w-full gap-6 my-20 sm:gap-12">
      {currentMembers.map((member: TMember, index) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 * (index + 1) }}
        >
          <Member {...member} />
        </motion.div>
      ))}
    </div>

    <SemiTitle text="Tidligere medlemmer" />
    <PastMembers />
  </div>
);

export default AboutPage;

const SemiTitle = ({ text }: { text: string }) => (
  <h1 className="mb-4 text-2xl font-semibold">{text}</h1>
);
