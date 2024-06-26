import getImage from "@/app/actions/getImage";
import getVoucherDetailsById from "@/app/actions/getVoucherDetailsById";
import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import { VoucherCardSkeleton } from "@/app/components/layout/skeletons";
import VoucherCard from "@/app/components/voucher/voucher-card";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const voucherDetails = await getVoucherDetailsById(id);
  const bannerUrl = await getImage(voucherDetails.banner_path, "vouchers");

  if (!voucherDetails) {
    notFound();
  }

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
      <Suspense fallback={<VoucherCardSkeleton />}>
        <VoucherCard voucher={{ ...voucherDetails, banner_path: bannerUrl }} />
      </Suspense>
    </main>
  );
}
