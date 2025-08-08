import React from 'react';

type SelectProps = {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
};

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  className = '',
  label,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};