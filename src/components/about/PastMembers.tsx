import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pastMembers } from '../../content';

export default function PastMembers() {
  const [expandedYear, setExpandedYear] = useState<string | null>(null);

  const toggleYear = (year: string) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  return (
    <div className="py-4 mx-auto shadow-md sm:py-4">
      <div className="flex flex-col gap-2">
        {pastMembers.map((yearData) => (
          <div
            key={yearData.year}
            className="overflow-hidden border border-gray-600 rounded-md"
          >
            <button
              className="flex items-center justify-between w-full p-4 text-base font-semibold text-left text-white transition-colors duration-200 bg-gray-800 cursor-pointer hover:bg-gray-700"
              onClick={() => toggleYear(yearData.year)}
              aria-expanded={expandedYear === yearData.year}
            >
              <span>Fondstyre {yearData.year}</span>
              <motion.svg
                animate={{ rotate: expandedYear === yearData.year ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </button>
            <AnimatePresence initial={false}>
              {expandedYear === yearData.year && (
                <motion.div
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={{
                    expanded: { height: 'auto' },
                    collapsed: { height: 0 },
                  }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="p-4 bg-gray-800">
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                      {yearData.members.map((member, index) => (
                        <li
                          key={index}
                          className="flex items-baseline text-sm text-gray-300 before:content-['•'] before:mr-2 before:text-gray-500"
                        >
                          {member.includes('(Leder)') ? (
                            <>
                              <span className="font-semibold">
                                {member.replace(' (Leder)', '')}
                              </span>
                              <span className="ml-1 text-xs text-onlineyellow">
                                (Leder)
                              </span>
                            </>
                          ) : (
                            member
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
