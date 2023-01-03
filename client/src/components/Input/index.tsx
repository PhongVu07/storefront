import React from "react";

interface IProps {
  placeholder?: string;
  label: string;
  value?: string;
  className?: string;
  name: string;
  onChange: (value: string, name: string) => void
}

const Input: React.FC<IProps> = ({
  placeholder,
  label,
  value,
  className,
  name,
  onChange
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          type="text"
          id={name}
          name={name}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value, name)}
        />
      </div>
    </div>
  );
};

export default Input;
