'use client';

import React from 'react';

interface OptionsBoxProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  className?: string;
}

const OptionsBox: React.FC<OptionsBoxProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  className = '',
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-200">{label}</label>
    <select
      value={value}
      onChange={onChange}
      required={required}
      className={`mt-1 block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-800 text-gray-200 ${className}`}
    >
      <option className="text-gray-200" value="" disabled>
        Velg {label.toLowerCase()}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default OptionsBox;
