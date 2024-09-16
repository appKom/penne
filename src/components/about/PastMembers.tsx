import { useState } from 'react';
import { pastMembers } from '../../content';
import clsx from 'clsx';

export default function PastMembers() {
  const [expandedYear, setExpandedYear] = useState<string | null>(null);

  const toggleYear = (year: string) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  return (
    <div className="max-w-[48rem] my-8 mx-auto p-4 sm:p-6 rounded-lg shadow-md bg-gray-800">
      <h2 className="mb-6 text-2xl font-bold text-center text-white">
        Tidligere medlemmer
      </h2>
      <div className="flex flex-col gap-2">
        {pastMembers.map((yearData) => (
          <div
            key={yearData.year}
            className="overflow-hidden border border-gray-600 rounded-md"
          >
            <button
              className="flex items-center justify-between w-full p-4 text-base font-semibold text-left text-white transition-colors duration-200 bg-gray-700 cursor-pointer hover:bg-gray-600"
              onClick={() => toggleYear(yearData.year)}
              aria-expanded={expandedYear === yearData.year}
            >
              <span>Fondstyre {yearData.year}</span>
              <svg
                className={clsx(
                  'transition-transform duration-200',
                  expandedYear === yearData.year ? 'rotate-180' : '',
                )}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={
                    expandedYear === yearData.year
                      ? 'M18 15L12 9L6 15'
                      : 'M6 9L12 15L18 9'
                  }
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {expandedYear === yearData.year && (
              <div className="p-4 bg-gray-700">
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
                          <span className="ml-1 text-xs text-blue-400">
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
