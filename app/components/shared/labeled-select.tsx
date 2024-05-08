import { forwardRef, ReactNode } from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface LabeledSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string | null;
  children: ReactNode;
}

const LabeledSelect = forwardRef<HTMLSelectElement, LabeledSelectProps>(
  ({ label, error, children, className, ...props }, ref) => {
    return (
      <div className='mb-4'>
        <label htmlFor={props.id} className='mb-2 block text-sm font-medium'>
          {label}
        </label>
        <div className='relative'>
          <select
            ref={ref}
            {...props}
            className={twMerge(
              "peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500",
              className
            )}
          >
            {children}
          </select>
          <MdOutlinePersonOutline className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
        </div>
        {error && (
          <div id={`${props.id}-error`} aria-live='polite' aria-atomic='true'>
            <p className='mt-2 text-sm text-red-500'>{error}</p>
          </div>
        )}
      </div>
    );
  }
);

LabeledSelect.displayName = "LabeledSelect";

export default LabeledSelect;
