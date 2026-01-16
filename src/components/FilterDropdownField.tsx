import React from 'react';

interface FilterDropdownFieldProps {
  label: string;
  value: string;
  onClick: () => void;
}

export const FilterDropdownField: React.FC<FilterDropdownFieldProps> = ({
  label,
  value,
  onClick,
}) => {
  return (
    <div className="space-y-3">
      <label className="text-base font-semibold text-text-primary">{label}</label>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-5 py-4 bg-surface-dark rounded-card"
      >
        <span className={`text-base ${value ? 'text-text-primary' : 'text-text-faded'}`}>
          {value || 'Choose...'}
        </span>
        <svg className="w-3.5 h-3.5 text-text-faded" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};
