import Member from '../components/about/Member';
import Title from '../components/all/Title';
import HorizontalLine from '../components/all/HorizontalLine';
import { aboutUsText, currentMembers } from '../content';
import { TMember } from '../lib/types';
import PastMembers from '../components/about/PastMembers';
import { motion } from 'framer-motion';

const AboutPage = () => (
  <div className="w-full max-w-6xl px-6 m-auto sm:p-12">
    <Title title="Fondstyret" />
    <HorizontalLine />
    <div className="flex flex-col items-center justify-center w-full gap-6 m-auto md:w-4/5">
      {aboutUsText.map((paragraph) => (
        <p className="text-left md:leading-7 md:text-lg">{paragraph}</p>
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

    <PastMembers />
  </div>
);

export default AboutPage;
