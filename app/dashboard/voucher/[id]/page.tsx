import getBrandDetailsById from "@/app/actions/getBrandDetailsById";
import getImage from "@/app/actions/getImage";
import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  // const brandDetails = await getBrandDetailsById(id);
  // const logoUrl = await getImage(brandDetails.logo_path, "brands");
  // //   const bannerURL = await getImage(brandDetails.logo_path, "brands");

  // if (!brandDetails) {
  //   notFound();
  // }

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
    </main>
  );
}
