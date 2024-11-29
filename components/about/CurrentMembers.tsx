'use client';

import { MemberType } from '@/lib/types';
import { motion } from 'framer-motion';
import SkeletonMember from './SkeletonMember';
import Member from './Member';

interface Props {
  members: MemberType[] | undefined;
}

const CurrentMembers = ({ members }: Props) => {
  const currentMembers = members
    ? members
        .filter((member: MemberType) => member.isCurrent)
        .sort((a: MemberType, b: MemberType) =>
          a.role === 'Leder' ? -1 : b.role === 'Leder' ? 1 : 0,
        )
    : [];

  const membersToRender: (MemberType | undefined)[] = members
    ? currentMembers
    : Array.from({ length: 4 }, () => undefined);

  return (
    <div className="flex flex-wrap items-center justify-center w-full max-w-full gap-6 my-20 sm:gap-12">
      {membersToRender.map((member, index) => (
        <motion.div
          key={member ? member.name : index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 * (index + 1) }}
        >
          {member ? <Member {...member} /> : <SkeletonMember />}
        </motion.div>
      ))}
    </div>
  );
};

export default CurrentMembers;
