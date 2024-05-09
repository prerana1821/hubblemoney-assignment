import getBrandNames from "@/app/actions/getBrandNames";
import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import { FormSkeleton } from "@/app/components/layout/skeletons";
import Form from "@/app/components/voucher/form";
import { Suspense } from "react";

export default async function Page() {
  const brands = await getBrandNames();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Voucher Management", href: "/dashboard/voucher" },
          {
            label: "Create Voucher",
            href: "/dashboard/voucher/create",
            active: true,
          },
        ]}
      />
      <Suspense fallback={<FormSkeleton />}>
        <Form brandNames={brands} />
      </Suspense>
    </main>
  );
}
