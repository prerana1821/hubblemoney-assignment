import React, { useState } from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface LabeledSelectProps {
  label: string;
  error?: string | null;
  children: React.ReactNode;
  custom?: boolean;
  className?: string;
  defaultValue?: string;
  name?: string;
  id: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  props?: any;
}

const LabeledSelect: React.FC<LabeledSelectProps> = ({
  id,
  label,
  error,
  name,
  children,
  className,
  defaultValue,
  custom,
  ...props
}) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (value === "custom") {
      setInputVisible(true);
    }
  };

  return (
    <div className='mb-4'>
      <label htmlFor={id} className='mb-2 block text-sm font-medium'>
        {label}
      </label>
      <div className='relative'>
        {inputVisible ? (
          <input
            {...props}
            type='text'
            value={selectedValue}
            className={twMerge(
              "peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500",
              className
            )}
            onChange={(e) => setSelectedValue(e.target.value)}
          />
        ) : (
          <select
            {...props}
            className={twMerge(
              "peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500",
              className
            )}
            onChange={handleChange}
          >
            {React.Children.toArray(children).map((child) =>
              React.cloneElement(child as React.ReactElement<any>, {
                key: (child as React.ReactElement<any>).props.value,
              })
            )}
            {custom && <option value='custom'>Custom</option>}
          </select>
        )}
        <MdOutlinePersonOutline className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
      </div>
      {error && (
        <div id={`${id}-error`} aria-live='polite' aria-atomic='true'>
          <p className='mt-2 text-sm text-red-500'>{error}</p>
        </div>
      )}
    </div>
  );
};

LabeledSelect.displayName = "LabeledSelect";

export default LabeledSelect;
