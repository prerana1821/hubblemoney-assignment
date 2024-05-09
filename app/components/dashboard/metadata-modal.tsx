import useGetMetadataById from "@/hooks/useGetMetadataById";
import useLoadImage from "@/hooks/useLoadImage";
import Card from "../metadata/brand-card";
import BrandCard from "../metadata/brand-card";
import VoucherCard from "../voucher/voucher-card";
import { VoucherManagementData } from "@/types/app";

const MetadataDetailsModal = ({
  brandId,
  onClose,
}: {
  brandId: string;
  onClose: () => void;
}) => {
  const { metadata } = useGetMetadataById(brandId);

  const imagePath = useLoadImage(metadata.brand.logo_path, "brands");

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen '>
        <div className='fixed inset-0 transition-opacity' onClick={onClose}>
          <div className='absolute inset-0 bg-gray-900 opacity-75'></div>
        </div>
        <div className='relative bg-white rounded-lg w-2/4 mx-auto my-8'>
          {/* Header */}
          <div className='sticky top-0 bg-white border-b border-gray-200 z-10 rounded-t-md'>
            <div className='py-4 px-6 flex justify-between items-center'>
              <h2 className='text-lg font-semibold'>
                {metadata?.brand?.name} Metadata Details
              </h2>
              <button
                onClick={onClose}
                className='text-gray-600 hover:text-gray-800 focus:outline-none'
              >
                Close
              </button>
            </div>
          </div>
          {/* Content */}
          <div className='p-2'>
            <BrandCard brand={metadata.brand} imagePath={imagePath} />
            {metadata.vouchers?.map((voucher: any) => {
              return <VoucherCard voucher={voucher} key={voucher.id} />;
            })}
          </div>
          {/* Footer */}
          <div className='sticky bottom-0 bg-white border-t border-gray-200 z-10 rounded-b-md'>
            <div className='py-4 px-6 flex justify-end items-center'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataDetailsModal;
