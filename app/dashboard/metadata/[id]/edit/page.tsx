import getBrandDetailsById from "@/app/actions/getBrandDetailsById";
import getImage from "@/app/actions/getImage";
import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import Form from "@/app/components/metadata/form";
import { notFound } from "next/navigation";

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
            label: "Edit Metadata",
            href: `/dashboard/metadata/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form brand={brandDetails} logoUrl={logoUrl} />
    </main>
  );
}
