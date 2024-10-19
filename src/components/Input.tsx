import React, { InputHTMLAttributes, ChangeEvent } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  id: string;
  type: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
const Input: React.FC<InputProps> = ({
  name,
  label,
  id,
  type,
  required,
  disabled,
  onChange,
  value,
}) => {
  return (
    <div className="grid grid-cols-6 gap-x-1 gap-y-3">
      <label className="col-span-2 font-bold text-lg justify-items-start" htmlFor={name}>
        {label}:
      </label>
      <input
        name={name}
        type={type}
        id={id}
        required={required}
        disabled={disabled}
        onChange={onChange}
        value={value}
        className="col-span-3 p-2 outline-none bg-white
      font-light
      border-2
      rounded-md justify-items-start"
      />
    </div>
  );
};

export default Input;
