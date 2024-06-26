import getBrandDetailsById from "@/app/actions/getBrandDetailsById";
import getImage from "@/app/actions/getImage";
import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import { BrandCardSkeleton } from "@/app/components/layout/skeletons";
import BrandCard from "@/app/components/metadata/brand-card";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const brandDetails = await getBrandDetailsById(id);
  const logoUrl = await getImage(brandDetails.logo_path, "brands");

  if (!brandDetails) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Brand Metadata", href: "/dashboard/metadata" },
          {
            label: "View Metadata",
            href: `/dashboard/metadata/${id}`,
            active: true,
          },
        ]}
      />
      <Suspense fallback={<BrandCardSkeleton />}>
        <BrandCard brand={brandDetails} imagePath={logoUrl} />
      </Suspense>
    </main>
  );
}
