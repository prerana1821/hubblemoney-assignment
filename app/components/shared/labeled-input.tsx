import { forwardRef } from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
}

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className='mb-4'>
        <label htmlFor={props.id} className='mb-2 block text-sm font-medium'>
          {label}
        </label>
        <div className='relative mt-2 rounded-md'>
          <div className='relative'>
            <input
              ref={ref}
              {...props}
              className={twMerge(
                "peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500",
                className
              )}
            />
            <MdOutlinePersonOutline className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
          </div>
          {error && (
            <div id={`${props.id}-error`} aria-live='polite' aria-atomic='true'>
              <p className='mt-2 text-sm text-red-500'>{error}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

LabeledInput.displayName = "LabeledInput";

export default LabeledInput;
