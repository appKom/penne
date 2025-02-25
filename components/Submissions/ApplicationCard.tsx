'use client';

import { formatDateNorwegian } from '@/lib/dateUtils';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Application } from '@prisma/client';

interface Props {
  application: Application;
}

const ApplicationCard = ({ application }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const cardStyle = application.approved
    ? 'bg-gradient-to-br from-gray-900 to-emerald-900'
    : 'bg-gradient-to-br from-gray-900 to-rose-900 ';

  return (
    <div
      className={`${cardStyle} border-2 border-gray-700 rounded-xl overflow-hidden shadow-lg relative shadow-gray-900/30`}
    >
      <div className="absolute top-4 right-4 z-10">
        <StatusBadge approved={application.approved} />
      </div>

      <button
        className="flex flex-row justify-between items-center p-6 w-full bg-gray-900 text-left transition-colors duration-300 hover:bg-black/10"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col gap-2 items-start">
          <h1 className="text-3xl font-bold mt-6 md:mt-0 text-white">
            {application.recipient}
          </h1>
          <p className="text-slate-200 font-medium">{application.purpose}</p>
          <p className="text-slate-200 text-sm">
            {formatDateNorwegian(application.dateApplied)}
          </p>
        </div>
        <ChevronDownIcon
          className={`w-8 h-8 text-white transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
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
            className="overflow-hidden backdrop-blur-sm bg-gray-900"
          >
            <div className="p-6 text-white">
              <div className="flex flex-wrap gap-4 mb-6">
                <InfoBadge
                  label="Søkt"
                  value={formatDateNorwegian(application.dateApplied)}
                />
                <InfoBadge
                  label={`${application.approved ? 'Innvilget' : 'Avslått'} `}
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
                <div className="mt-4 p-4 rounded-lg shadow-lg bg-gray-700 backdrop-blur-sm">
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
                      className="w-full h-[400px] rounded-lg border-2 border-white/20"
                    />
                  ) : (
                    <img
                      src={application.attachment || '/placeholder.svg'}
                      alt="Preview"
                      className="max-w-full h-auto rounded-lg border-2 border-white/20"
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

const StatusBadge = ({ approved }: { approved: boolean }) => (
  <div
    className={`
      px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2
      transition-all duration-300 border
      ${approved ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-rose-500 text-white border-rose-600'}
    `}
  >
    <span className="relative flex h-3 w-3">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${approved ? 'bg-emerald-700' : 'bg-rose-700'}`}
      ></span>
      <span
        className={`relative inline-flex rounded-full h-3 w-3 ${approved ? 'bg-emerald-300' : 'bg-rose-300'}`}
      ></span>
    </span>
    <span className="font-medium">
      {approved ? 'Innvilget' : 'Ikke innvilget'}
    </span>
  </div>
);

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
    <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
      <div className="h-32 w-full" />
    </div>
  );
};
