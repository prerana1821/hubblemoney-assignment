import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import Form from "@/app/components/metadata/form";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Brand Metadata", href: "/dashboard/metadata" },
          {
            label: "Create Metadata",
            href: "/dashboard/metadata/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
