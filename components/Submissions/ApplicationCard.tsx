import { formatDateNorwegian } from '@/lib/dateUtils';
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
        className="flex flex-row justify-between items-center py-3 w-full"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col gap-1 items-start">
          <h1 className="text-2xl font-semibold">{application.recipient}</h1>
          <p className="text-gray-400">{application.purpose}</p>
        </div>
        <ArrowDownIcon
          className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${
            expanded ? 'rotate-180' : ''
          } self-center`}
        />
      </button>

      {expanded && (
        <div className="py-2 text-white">
          <div className="flex flex-col sm:flex-row gap-4 pb-4">
            <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">
              <span className="font-medium">Søkt:</span>{' '}
              {formatDateNorwegian(application.dateApplied)}
            </div>
            <div className="bg-gray-700 rounded-full px-3 py-1 text-sm">
              <span className="font-medium">Innvilget:</span>{' '}
              {formatDateNorwegian(application.dateGranted)}
            </div>
          </div>
          <p>Søkt beløp: {application.amountApplied}</p>
          <p>Innvilget beløp: {application.grantedAmount}</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;

export const SkeletonApplication = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center w-full animate-pulse">
      <div className="overflow-hidden rounded-lg bg-gray-700 h-16 w-full lg:h-16" />
    </div>
  );
};
