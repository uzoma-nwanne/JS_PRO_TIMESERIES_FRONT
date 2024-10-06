import React, { InputHTMLAttributes,ChangeEvent } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  id: string;
  type: string;
  required?: boolean;
  disabled?: boolean;
  onChange: (e:ChangeEvent<HTMLInputElement>)=>void,
  value:string
}
const Input: React.FC<InputProps> = ({
  name,
  label,
  id,
  type,
  required,
  disabled,
  onChange,
  value
}) => {
  return (
    <div className="w-full p-4">
      <label className="font-bold w-1/4 text-lg">
        {label}:
        <input
          name={name}
          type={type}
          id={id}
          required={required}
          disabled={disabled}
          onChange={onChange}
          value={value}
          className="w-3/4 p-2 ml-2 outline-none bg-white
      font-light
      border-2
      rounded-md"
        />
      </label>
    </div>
  );
};

export default Input;
