'use client';

import { formatDateNorwegian } from '@/lib/dateUtils';
import { ApplicationType } from '@/lib/types';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  application: ApplicationType;
}

const ApplicationCard = ({ application }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-800/80 rounded-xl overflow-hidden shadow-lg">
      <button
        className="flex flex-row justify-between items-center p-6 w-full text-left transition-colors duration-300 hover:bg-gray-800/70"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-3xl font-bold text-white">
            {application.recipient}
          </h1>
          <p className="text-slate-200 font-medium">{application.purpose}</p>
          <p className="text-slate-200 text-sm">
            {formatDateNorwegian(application.dateApplied)}
          </p>
        </div>
        <ChevronDownIcon
          className={`w-8 h-8 text-white transform transition-transform duration-300 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={{
              expanded: { height: 'auto', opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden bg-white/10 backdrop-blur-sm"
          >
            <div className="p-6 text-white">
              <div className="flex flex-wrap gap-4 mb-6">
                <InfoBadge
                  label="Søkt"
                  value={formatDateNorwegian(application.dateApplied)}
                />
                <InfoBadge
                  label="Innvilget"
                  value={formatDateNorwegian(application.dateGranted)}
                />
              </div>
              <InfoRow
                label="Søkt beløp"
                value={`${application.amountApplied.toLocaleString('no-NO')} kr`}
              />
              <InfoRow
                label="Innvilget beløp"
                value={`${application.grantedAmount.toLocaleString('no-NO')} kr`}
              />
              {application.description && (
                <div className="mt-4 p-4 rounded-lg shadow-lg backdrop-blur-sm">
                  <p className="text-white text-lg">
                    {application.description}
                  </p>
                </div>
              )}
              {application.attachment && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">Vedlegg</h3>
                  {application.attachment.split('.').pop() === 'pdf' ? (
                    <iframe
                      src={application.attachment}
                      title="PDF Preview"
                      className="w-full h-[400px] rounded-lg border-2 border-white/30"
                    />
                  ) : (
                    <img
                      src={application.attachment}
                      alt="Preview"
                      className="max-w-full h-auto rounded-lg border-2 border-white/30"
                    />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoBadge = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-full bg-gray-700/80 px-4 py-2 text-md text-white backdrop-blur-sm shadow-lg">
    <span className="font-bold">{label}:</span> {value}
  </div>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-white/20">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

export default ApplicationCard;

export const SkeletonApplication = () => {
  return (
    <div className="bg-gradient-to-br from-purple-600/50 to-blue-500/50 rounded-xl overflow-hidden shadow-lg animate-pulse">
      <div className="h-32 w-full" />
    </div>
  );
};
