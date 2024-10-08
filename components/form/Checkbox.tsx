'use client';

import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  className = '',
}) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
    />
    <label htmlFor={id} className="text-sm font-medium text-gray-200">
      {label}
    </label>
  </div>
);

export default Checkbox;
