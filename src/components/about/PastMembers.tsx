'use client';

import { useState } from 'react';
import styles from './blah.module.css';
import { pastMembers } from '../../content';

export default function PastMembers() {
  const [expandedYear, setExpandedYear] = useState<string | null>(null);

  const toggleYear = (year: string) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  return (
    <div className="max-w-[48rem] my-8 mx-auto p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center">Tidligere medlemmer</h2>
      <div className="flex flex-col gap-2">
        {pastMembers.map((yearData) => (
          <div key={yearData.year} className="border border-[#333b54] rounded-md overflow-hidden">
            <button
              className={styles.yearButton}
              onClick={() => toggleYear(yearData.year)}
              aria-expanded={expandedYear === yearData.year}
            >
              <span>Fondstyre {yearData.year}</span>
              <svg
                className={styles.icon}
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
              <div className={styles.memberList}>
                <ul>
                  {yearData.members.map((member, index) => (
                    <li key={index} className={styles.memberItem}>
                      {member.includes('(Leder)') ? (
                        <>
                          <span className="font-semibold">
                            {member.replace(' (Leder)', '')}
                          </span>
                          <span className="ml-1 text-xs text-[#2563eb]">(Leder)</span>
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
