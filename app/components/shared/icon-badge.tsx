import React from "react";

const Iconbadge = ({ label, icon }: { label: string; icon: any }) => {
  return (
    <div className='flex items-center mt-2'>
      <span className='text-gray-600 mr-2'>Status: </span>
      <span className='py-1 px-2 inline-flex items-center gap-x-1 text-sm font-medium bg-teal-100 text-teal-800 rounded-full'>
        {icon}
        {label}
      </span>
    </div>
  );
};

export default Iconbadge;
