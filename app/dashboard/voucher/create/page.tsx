// import Form from "@/app/ui/invoices/create-form";
// import { fetchCustomers } from "@/app/lib/data";
import getBrandNames from "@/app/actions/getBrandNames";
import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import Form from "@/app/components/voucher/create-form";

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
      <Form brands={brands} />
    </main>
  );
}
