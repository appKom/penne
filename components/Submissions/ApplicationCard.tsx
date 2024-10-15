import { ApplicationType } from '@/lib/types';
import { ArrowDownIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
  application: ApplicationType;
}

const ApplicationCard = ({ application }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg justify-center px-6">
      <button
        className="flex flex-row justify-between py-4 w-full"
        onClick={() => setExpanded(!expanded)}
      >
        <h1 className="text-2xl font-semibold">{application.recipient}</h1>
        <ArrowDownIcon
          className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      {expanded && <p className="text-gray-400">{application.purpose}</p>}
    </div>
  );
};

export default ApplicationCard;

export const SkeletonApplication = () => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4 text-center w-fit animate-pulse">
      <div className="relative overflow-hidden rounded-full bg-gray-700 h-32 w-32 lg:w-48 lg:h-48" />
      <div className="w-32 h-6 bg-gray-700 rounded mt-2" />
    </div>
  );
};
