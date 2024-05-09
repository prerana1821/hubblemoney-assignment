import getImage from "@/app/actions/getImage";
import getVoucherDetailsById from "@/app/actions/getVoucherDetailsById";
import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import VoucherCard from "@/app/components/voucher/voucher-card";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const voucherDetails = await getVoucherDetailsById(id);
  const bannerUrl = await getImage(voucherDetails.banner_path, "vouchers");

  if (!voucherDetails) {
    notFound();
  }

  console.log({ voucherDetails });

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Voucher Management", href: "/dashboard/voucher" },
          {
            label: "View Voucher",
            href: `/dashboard/voucher/${id}`,
            active: true,
          },
        ]}
      />
      <VoucherCard voucher={{ ...voucherDetails, banner_path: bannerUrl }} />;
    </main>
  );
}
