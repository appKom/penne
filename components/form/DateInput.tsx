import React from 'react';

interface DateInputProps {
  label?: string;
  value?: Date;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col w-full max-w-lg ">
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      <input
        type="date"
        value={value ? value.toISOString().split('T')[0] : ''}
        onChange={onChange}
        className="p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default DateInput;
