"use client";

import { useState } from "react";

const HighlightModal = ({ highlights }: { highlights: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <td className='px-3 py-3 max-w-52'>
      <span
        className='text-blue-500 truncate max-w-full block overflow-hidden whitespace-nowrap cursor-pointer'
        onClick={toggleModal}
      >
        {highlights.join(", ")}
      </span>
      {isOpen && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen'>
            <div
              className='fixed inset-0 transition-opacity'
              onClick={toggleModal}
            >
              <div className='absolute inset-0 bg-gray-900 opacity-75'></div>
            </div>
            <div className='relative bg-white rounded-lg max-w-md mx-auto p-8'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold'>Highlights</h2>
                <button
                  onClick={toggleModal}
                  className='text-gray-600 hover:text-gray-800 focus:outline-none'
                >
                  Close
                </button>
              </div>
              <ul>
                {highlights.map((highlight, index) => (
                  <li key={index} className='text-gray-700 mb-2'>
                    {index + 1}. {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </td>
  );
};

export default HighlightModal;
