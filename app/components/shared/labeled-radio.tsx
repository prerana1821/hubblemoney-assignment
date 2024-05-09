import { forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface RadioOption {
  label: string;
  value: string;
}

interface LabeledRadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  options: RadioOption[];
  error?: string | null;
  value: string;
}

const LabeledRadio = forwardRef<HTMLInputElement, LabeledRadioProps>(
  ({ label, options, error, className, value, ...props }, ref) => {
    return (
      <div className='mb-4'>
        <fieldset>
          <legend className='mb-2 block text-sm font-medium'>{label}</legend>
          <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
            <div className='flex gap-4'>
              {options.map(({ label: optionLabel, value: optionValue }) => (
                <div key={optionValue} className='flex items-center'>
                  <input
                    {...props}
                    ref={ref}
                    type='radio'
                    aria-describedby={`${props.id}-error`}
                    value={optionValue}
                    checked={value === optionValue}
                    className={twMerge(
                      "h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2",
                      className
                    )}
                  />
                  <label
                    htmlFor={props.id}
                    className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'
                  >
                    {optionLabel}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </fieldset>
        {error && (
          <div id={`${props.id}-error`} aria-live='polite' aria-atomic='true'>
            <p className='mt-2 text-sm text-red-500'>{error}</p>
          </div>
        )}
      </div>
    );
  }
);

LabeledRadio.displayName = "LabeledRadio";

export default LabeledRadio;
