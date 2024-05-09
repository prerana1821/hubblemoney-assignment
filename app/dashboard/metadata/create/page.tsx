import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import { FormSkeleton } from "@/app/components/layout/skeletons";
import Form from "@/app/components/metadata/form";
import { Suspense } from "react";

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
      <Suspense fallback={<FormSkeleton />}>
        <Form />
      </Suspense>
    </main>
  );
}
