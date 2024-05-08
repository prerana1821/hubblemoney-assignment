import getBrandNames from "@/app/actions/getBrandNames";
import getImage from "@/app/actions/getImage";
import getVoucherDetailsById from "@/app/actions/getVoucherDetailsById";
import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import Form from "@/app/components/voucher/form";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  // TODO: promise all for first two
  const brands = await getBrandNames();
  const voucherDetails = await getVoucherDetailsById(id);
  const bannerUrl = await getImage(voucherDetails.banner_path, "vouchers");

  if (!voucherDetails) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "View Voucher", href: `/dashboard/voucher/${id}` },
          {
            label: "Edit Voucher",
            href: `/dashboard/voucher/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form
        brandNames={brands}
        voucher={voucherDetails}
        bannerUrl={bannerUrl}
      />
    </main>
  );
}
