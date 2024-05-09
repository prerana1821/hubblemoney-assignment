import useOutsideClick from "@/hooks/useOutsideClick";
import { ColumnItem } from "@/types/app";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { CiViewColumn } from "react-icons/ci";

interface CheckboxListProps {
  items: ColumnItem[];
  checkedItems: string[];
  onCheckboxChange: (value: ColumnItem) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  checkedItems,
  onCheckboxChange,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [dropdownWidth, setDropdownWidth] = useState<number>(0);
  const [numChecked, setNumChecked] = useState<number>(checkedItems.length);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewRef.current && dropdownRef.current) {
      const viewRect = viewRef.current.getBoundingClientRect();
      setDropdownWidth(viewRect.width);
    }
  }, [menuOpen]);

  useEffect(() => {
    setNumChecked(checkedItems.length);
  }, [checkedItems]);

  useOutsideClick(dropdownRef, () => setMenuOpen(false));

  const handleCheckboxValues = (item: ColumnItem) => {
    const updatedCheckedItems = [...checkedItems];
    if (updatedCheckedItems.includes(item.value)) {
      if (numChecked >= 3) {
        const index = updatedCheckedItems.indexOf(item.value);
        updatedCheckedItems.splice(index, 1);
        setNumChecked(numChecked - 1);
      }
    } else {
      updatedCheckedItems.push(item.value);
      setNumChecked(numChecked + 1);
    }
    onCheckboxChange(item);
    if (updatedCheckedItems.length === 3) {
      toast.error("You need to select at least three items.");
    }
  };

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
            className='border  text-center rounded-md border-gray-300 min-w-32 py-1'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            View
          </div>
          <CiViewColumn className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
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
                    value={item.value}
                    checked={checkedItems.includes(item.value)}
                    disabled={
                      numChecked <= 3 && checkedItems.includes(item.value)
                    }
                    onChange={() => handleCheckboxValues(item)}
                    className='w-4 h-4 text-blue-600 py-2.5 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
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
