'use client';

import React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
}

const TextAreaInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  onChange,
  required = false,
  className = '',
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-200">
      {label}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className={`mt-1 p-1 block w-full max-w-lg rounded-md bg-gray-700 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
    />
  </div>
);

export default TextAreaInput;
