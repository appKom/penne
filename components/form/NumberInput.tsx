'use client';

import React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const NumberInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = 'number',
  value,
  onChange,
  required = false,
  className = '',
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-200">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className={`mt-1 p-1 block w-full max-w-lg rounded-md bg-gray-700 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
    />
  </div>
);

export default NumberInput;
