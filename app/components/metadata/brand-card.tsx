import Image from "next/image";
import Iconbadge from "../shared/icon-badge";
import { GrStatusGood } from "react-icons/gr";
import { BrandDataFromDB } from "@/types/app";

const BrandCard = ({
  brand,
  imagePath,
}: {
  brand: BrandDataFromDB;
  imagePath: string;
}) => {
  return (
    <div className=' p-5'>
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          {imagePath && (
            <Image
              src={imagePath}
              alt='Brand Image'
              width={200}
              height={200}
              className='w-32 h-32 object-cover rounded-full'
            />
          )}
        </div>
        <div className='p-8'>
          <h2 className='block mt-1 text-3xl leading-tight font-semibold text-gray-900'>
            {brand?.name}
          </h2>
          <div className='mt-2 flex items-center'>
            <Iconbadge label={brand?.status} icon={<GrStatusGood />} />
          </div>
        </div>
      </div>
      <div className='my-6'>
        <div className='text-base ml-2 leading-6 font-medium text-gray-500 text-wrap'>
          Brand Category:
        </div>
        <p className='mt-2 ml-2  text-wrap'> {brand?.category}</p>
        <div className='text-base ml-2 mt-4 leading-6 font-medium text-gray-500 text-wrap'>
          Description:
        </div>
        <p className='mt-2 ml-2  text-wrap'>{brand?.description}</p>
      </div>
    </div>
  );
};

export default BrandCard;
