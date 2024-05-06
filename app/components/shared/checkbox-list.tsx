import React from "react";

interface CheckboxItem {
  label: string;
  value?: string;
}

interface CheckboxListProps {
  items: CheckboxItem[];
  checkedItems: boolean[];
  onCheckboxChange: (index: number) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  checkedItems,
  onCheckboxChange,
}) => {
  return (
    <div>
      <ul className='w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
        {items.map((item, index) => (
          <li
            key={index}
            className={`w-full border-b ${
              index === 0 ? "rounded-t-lg" : ""
            } border-gray-200 ${
              index === items.length - 1 ? "rounded-b-lg" : ""
            } dark:border-gray-600`}
          >
            <div className='flex items-center ps-3'>
              <input
                id={`checkbox-${index}`}
                type='checkbox'
                value={item.value || ""}
                checked={checkedItems[index] || false}
                onChange={() => onCheckboxChange(index)}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              />
              <label
                htmlFor={`checkbox-${index}`}
                className='w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                {item.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxList;
