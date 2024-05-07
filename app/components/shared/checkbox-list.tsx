import React, { useState, useRef, useEffect } from "react";
import { VscSettings } from "react-icons/vsc";

interface CheckboxItem {
  label: string;
  value?: string;
}

interface CheckboxListProps {
  items: CheckboxItem[];
  checkedItems: string[];
  onCheckboxChange: (index: number) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  checkedItems,
  onCheckboxChange,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [dropdownWidth, setDropdownWidth] = useState<number>(0);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewRef.current && dropdownRef.current) {
      const viewRect = viewRef.current.getBoundingClientRect();
      setDropdownWidth(viewRect.width);
    }
  }, [menuOpen]);

  return (
    <div className='mb-4'>
      <label
        htmlFor={"selectedColumns"}
        className='mb-2 block text-sm font-medium'
      >
        Toggle Columns
      </label>
      <div className='relative rounded-md'>
        <div className='relative'>
          <div
            ref={viewRef}
            className='border py-1 text-center rounded-md border-gray-300'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            View
          </div>
          <VscSettings className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
        </div>
        {menuOpen && (
          <ul
            ref={dropdownRef}
            style={{ minWidth: dropdownWidth }}
            className='origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 text-sm font-medium text-black'
          >
            {items.map((item, index) => (
              <li
                key={index}
                className='w-full border-b border-gray-200 rounded-t-lg'
              >
                <div className='flex items-center ps-3'>
                  <input
                    id={`checkbox-${index}`}
                    type='checkbox'
                    value={item.value || ""}
                    checked={checkedItems[index]?.length > 0} // Updated to boolean
                    onChange={() => {
                      onCheckboxChange(index);
                      setMenuOpen(false);
                    }}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
                  />
                  <label
                    htmlFor={`checkbox-${index}`}
                    className='w-full py-3 ms-2 text-sm font-medium text-gray-900 '
                  >
                    {item.label}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CheckboxList;
