import getMetadataCardDetails from "@/app/actions/getMetadataCardDetails";
import { CreateBrandData } from "@/app/components/metadata/buttons";
import { Card } from "@/app/components/shared/count-card";

export default async function Page() {
  const cardData = await getMetadataCardDetails();

  return (
    <main>
      <h1 className={"mb-4 text-xl md:text-2xl"}>Metadata Details</h1>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <Card
          title='Total Brands'
          value={cardData.totalCount}
          type='totalCount'
        />
        <Card
          title='Active Brands'
          value={cardData.activeCount}
          type='activeCount'
        />
        <Card
          title='Inactive Brands'
          value={cardData.inactiveCount}
          type='inactiveCount'
        />
      </div>
      <h2 className='text-xl font-medium my-4 mt-8'>Create Metadata</h2>
      <CreateBrandData />
    </main>
  );
}
