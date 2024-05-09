import getBrandDetailsById from "@/app/actions/getBrandDetailsById";
import getImage from "@/app/actions/getImage";
import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import { FormSkeleton } from "@/app/components/layout/skeletons";
import Form from "@/app/components/metadata/form";
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
          { label: "View Metadata", href: `/dashboard/metadata/${id}` },
          {
            label: "Edit Metadata",
            href: `/dashboard/metadata/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Suspense fallback={<FormSkeleton />}>
        <Form brand={brandDetails} logoUrl={logoUrl} />
      </Suspense>
    </main>
  );
}
