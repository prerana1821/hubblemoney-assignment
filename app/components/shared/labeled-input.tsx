import { forwardRef } from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { TiDeleteOutline } from "react-icons/ti";

interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  clearInputValue?: (name: string) => void;
  icon: any;
}

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, error, className, clearInputValue, icon, ...props }, ref) => {
    const Icon = icon;
    return (
      <div className='mb-4'>
        <div className='flex justify-between align-middle'>
          <label htmlFor={props.id} className='mb-2 block text-sm font-medium'>
            {label}
          </label>
          {clearInputValue && (
            <div
              onClick={() => clearInputValue("expirationDate")}
              className='w-2 h-2 cursor-pointer pr-4 pt-0.5'
            >
              <TiDeleteOutline />
            </div>
          )}
        </div>
        <div className='relative rounded-md'>
          <div className='relative'>
            <input
              ref={ref}
              {...props}
              className={twMerge(
                "peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500",
                className
              )}
            />
            <Icon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
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
