import getVoucherCounts from "@/app/actions/getVoucherCardDetails";
import { Card } from "@/app/components/shared/count-card";
import { CreateVoucher } from "@/app/components/voucher/buttons";

export default async function Page() {
  const cardData = await getVoucherCounts();

  return (
    <main>
      <h1 className={"mb-4 text-xl md:text-2xl"}>Voucher Management</h1>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <Card
          title='Vouchers Available'
          value={cardData.totalCount}
          type='totalCount'
        />
        <Card
          title='Active Vouchers'
          value={cardData.activeCount}
          type='activeCount'
        />
        <Card
          title='Expired Vouchers'
          value={cardData.expiredCount}
          type='expiredCount'
        />
      </div>

      <h2 className='text-xl font-medium my-4 mt-8'>Create Voucher</h2>
      <CreateVoucher />
    </main>
  );
}
